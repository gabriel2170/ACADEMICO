public class PessoaImc extends Pessoa{
    
    private double peso;
    private double altura;
    
    public PessoaImc(String nome, String dataNascimento, double peso, double altura){
        super(nome,dataNascimento);
        setPeso(peso);
        setAltura(altura);
    }
    
    public double getPeso(){
        return peso;
    }
    
    public void setPeso(double peso){
        this.peso=peso;
    }
    
    public double getAltura(){
        return altura;
    }
    
    public void setAltura(double altura){
        this.altura = altura;
    }
    
    public double calculaImc(double peso, double altura){
        double imc;
        imc = peso/(altura*altura);
        return imc;
    }
     public String toString(){
         String s;
         s=super.toString() + "\n Peso: "+peso + " Altura: " + altura;
         return s;
     }
    
}