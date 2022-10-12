public class ProfessorHorista extends Professor{
    
    private double salarioHora;
    
    public ProfessorHorista(String nome, int matricula, int cargaHoraria, double salarioHora){
        super(nome,matricula,cargaHoraria);
        this.salarioHora=salarioHora;
    }
    
    public double getSalarioHora(){
        return salarioHora;
    }
    
    public void setSalarioHora(double salarioHora){
        this.salarioHora = salarioHora;
    }
    
    public double getSalario(){
        double sal;
        sal = salarioHora * getCargaHoraria();
        return sal;
    }
}