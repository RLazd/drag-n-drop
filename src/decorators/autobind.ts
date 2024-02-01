namespace App {
  export // Decorators
  function Autobind(_0: any, _1: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFunction = originalMethod.bind(this);
        return boundFunction;
      },
    };
    return adjustedDescriptor;
  }
}
