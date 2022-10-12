/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package projetoSeguradora;

/**
 *
 * @author Orsi
 */
public class SeguroResidencial extends Seguro{
    
    private double franquia;
    private int anoConstrucao;
    
    public SeguroResidencial(int numeroApolice, String nomeSegurado, Endereco enderecoSegurado,
                  double valorSeguro, double premioSeguro, double franquia, int anoConstrucao){
        super(numeroApolice,nomeSegurado,enderecoSegurado,valorSeguro,premioSeguro);
        this.franquia = franquia;
        this.anoConstrucao=anoConstrucao;
    }

    public double getFranquia() {
        return franquia;
    }

    public void setFranquia(double franquia) {
        this.franquia = franquia;
    }

    public int getAnoConstrucao() {
        return anoConstrucao;
    }

    public void setAnoConstrucao(int anoConstrucao) {
        this.anoConstrucao = anoConstrucao;
    }
    
    public String toString(){
        String s;
        s = super.toString() + "\n Franquia: " + franquia + " Ano Construcao: " + anoConstrucao;
        return s;
    }
    
    public void mostraSeguro(){
        System.out.println("Seguro Residencial");
        System.out.println(toString());
    }
}
