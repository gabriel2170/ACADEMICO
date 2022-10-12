public class Pessoa {
   
    private String nome;
    private String dataNascimento;
    
    public Pessoa(String nome, String dataNascimento){
        setNome(nome);
        setDataNascimento(dataNascimento);
    }
    public String getNome(){
        return nome;
    }
    
    public void setNome(String nome){
        this.nome = nome;
    }
    
    public String getDataNascimento(){
        return dataNascimento;
    }
    
    public void setDataNascimento(String dataNascimento){
        this.dataNascimento = dataNascimento;
    }
    
    public String toString(){
        return "Nome: " + nome + " Data Nascimento: " + dataNascimento;
    }
}