export class Logger {
    private messages: string[] = [];

    public log(msg: string): void {
        this.messages.push(msg);
        console.log(msg);
    }

    public getLogs(): string[] {
        return this.messages;
    }

    public clear(): void {
        this.messages = [];
    }
}