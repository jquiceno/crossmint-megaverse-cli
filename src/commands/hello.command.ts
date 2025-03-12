import { Command, CommandRunner, Option } from 'nest-commander';

interface HelloCommandOptions {
  name?: string;
  greeting?: string;
}

@Command({ name: 'hello', description: 'Say hello to someone' })
export class HelloCommand extends CommandRunner {
  async run(
    passedParams: string[],
    options?: HelloCommandOptions,
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const name = options?.name ?? 'World';
    const greeting = options?.greeting ?? 'Hello';
    console.log(`${greeting}, ${name}!`);
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the person to greet',
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-g, --greeting [greeting]',
    description: 'The greeting to use',
  })
  parseGreeting(val: string): string {
    return val;
  }
}
