export type ExampleArgs = {
    name: string;
};

export async function greeterFlow(
    args: ExampleArgs,
): Promise<{ greeting: string }> {
    const greeting = await greet(args.name);
    return { greeting };
}

async function greet(name: string): Promise<string> {
    return `Hello ${name}`;
}