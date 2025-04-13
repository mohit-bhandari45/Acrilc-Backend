const normalizeToArray = (input: any): string[] => {
    if (!input || input === undefined || input === "") return [];

    if (Array.isArray(input)) return input;

    return [input];
};

export { normalizeToArray };
