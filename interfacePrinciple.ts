


class CalculadoraDeImpostos {
  public calcularImposto(
    tipoDeImposto: string,
    valor: number,
  ): number {
    if (tipoDeImposto === "ICMS") {
      // ICMS = 10%
      return valor * 0.1
    }

    if (tipoDeImposto === "INSS") {
      // INSS = 20%
      return valor * 0.20
    }

    return valor
  }
}

const calculadora = new CalculadoraDeImpostos()

calculadora.calcularImposto('ICMS', 100),
calculadora.calcularImposto('INSS', 200)

