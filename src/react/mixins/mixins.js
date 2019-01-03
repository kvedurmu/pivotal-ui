export default ParentClass => ({
  with(...classGenerators) {
    return classGenerators.reduceRight((ParentClass, classGenerator) => classGenerator(ParentClass), ParentClass);
  }
});
