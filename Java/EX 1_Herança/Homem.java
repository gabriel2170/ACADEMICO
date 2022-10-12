public class Homem extends PessoaImc{
    
    public Homem(String nome, String dataNascimento, double peso, double altura){
        super(nome,dataNascimento,peso,altura);
    }
    
    public String resultadoImc(){
        double imc;
        String s;
        imc = calculaImc(getPeso(),getAltura());
        if (imc <20.7)
            s="IMC: " + imc + " - Abaixo do peso ideal";
        else
            if (imc<26.4)
                s="IMC: " + imc + " - No peso ideal";
            else
                s= "IMc: " + imc + " - Acima do peso ideal";
        return s;
    }
    
}