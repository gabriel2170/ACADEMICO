public class Fornecedor extends Pessoa {
    
    private double valorDivida;
    private double valorCredito;
    
    public Fornecedor(String nome, String endereco, String telefone,
                      double valorDivida, double valorCredito){
        super(nome,endereco,telefone);
        setValorDivida(valorDivida);
        setValorCredito(valorCredito);
    }
    
    public double getValorDivida(){
        return valorDivida;
    }
    
    public void setValorDivida(double valorDivida){
        this.valorDivida = valorDivida;
    }
    
    public double getValorCredito(){
        return valorCredito;
    }
    
    public void setValorCredito(double valorCredito){
        this.valorCredito=valorCredito;
    }
    
    public double obterSaldo(){
        double saldo;
        saldo=valorCredito - valorDivida;
        return saldo;
    }
    
}