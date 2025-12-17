import { OutputClientFunc } from "@orval/core";

export const outputClient: OutputClientFunc = (getClients) => {
  const generator = getClients["react-query"];
  return {
    ...generator,
    client: async (...originalArgs) => {
      const [verbOptions, ...otherOptions] = originalArgs;

      const args: typeof originalArgs = [
        {
          ...verbOptions,
          override: {
            ...verbOptions.override,
            query: {
              ...verbOptions.override.query,
              version: 5,
              shouldSplitQueryKey: true,
              signal: true,
            },
          },
        },
        ...otherOptions,
      ];

      const rawResult = await generator.client(...args);

      const options = originalArgs[0];
      if (!options.override.query.useInfiniteQueryParam) return rawResult;
      if (
        options.params.some(({ name }) => {
          return name === options.override.query.useInfiniteQueryParam;
        })
      ) {
        return rawResult;
      }

      const content = rawResult.implementation;
      const bodyProp = options.props.find(({ type }) => type === "body");

      if (!bodyProp) return rawResult;

      const newContent = content.replace(
        /export const \S*InfiniteQueryOptions(?:.|\n)*?(?=^export)/m,
        (substring) => {
          return substring.replace(
            new RegExp(
              `(const queryFn: .*?\\().*?(\\) =>.*?)(${bodyProp.name})`
            ),
            `$1{ signal, pageParam }$2{ ...${bodyProp.name}, ${options.override.query.useInfiniteQueryParam}: pageParam as number }`
          );
        }
      );

      return {
        ...rawResult,
        implementation: newContent,
      };
    },
  };
};
