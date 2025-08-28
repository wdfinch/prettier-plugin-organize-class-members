/* eslint-disable */
export abstract class BaseStep<TInput, TOutput> {
  protected abstract executeStep(input: TInput): Promise<void>
}

abstract class MixedExample {
  public static created() {}
  abstract id: string
  public run() {}
  public abstract doWork(): void
  protected abstract compute(): number
  protected abstract process(): void
  private helper() {}
}
