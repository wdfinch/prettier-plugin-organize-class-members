/* eslint-disable */
export abstract class BaseStep<TInput, TOutput> {
  protected abstract executeStep(input: TInput): Promise<void>
}

abstract class MixedExample {
  public abstract doWork(): void
  protected abstract compute(): number
  private helper() {}
  public run() {}
  protected abstract process(): void
  public static created() {}
  abstract id: string
}
