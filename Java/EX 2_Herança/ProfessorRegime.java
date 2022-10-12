public class ProfessorRegime extends Professor {
    
    private double salario;
    
    public ProfessorRegime(String nome, int matricula, double salario){
        super(nome,matricula,40);
        this.salario=salario;
    }
    
    public double getSalario(){
        return salario;
    }
    
    public void setSalario(double salario){
        this.salario = salario;
    }
    
}