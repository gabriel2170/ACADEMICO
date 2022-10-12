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
public abstract class Seguro {
    
    private int numeroApolice;
    private String nomeSegurado;
    private Endereco enderecoSegurado;
    private double valorSeguro;
    private double premioSeguro;
    
    public Seguro(int numeroApolice, String nomeSegurado, Endereco enderecoSegurado,
                  double valorSeguro, double premioSeguro){
        this.numeroApolice=numeroApolice;
        this.nomeSegurado=nomeSegurado;
        this.enderecoSegurado=enderecoSegurado;
        this.valorSeguro=valorSeguro;
        this.premioSeguro=premioSeguro;
    }

    public int getNumeroApolice() {
        return numeroApolice;
    }

    public void setNumeroApolice(int numeroApolice) {
        this.numeroApolice = numeroApolice;
    }

    public String getNomeSegurado() {
        return nomeSegurado;
    }

    public void setNomeSegurado(String nomeSegurado) {
        this.nomeSegurado = nomeSegurado;
    }

    public Endereco getEnderecoSegurado() {
        return enderecoSegurado;
    }

    public void setEnderecoSegurado(Endereco enderecoSegurado) {
        this.enderecoSegurado = enderecoSegurado;
    }

    public double getValorSeguro() {
        return valorSeguro;
    }

    public void setValorSeguro(double valorSeguro) {
        this.valorSeguro = valorSeguro;
    }

    public double getPremioSeguro() {
        return premioSeguro;
    }

    public void setPremioSeguro(double premioSeguro) {
        this.premioSeguro = premioSeguro;
    }
    
    public String toString(){
        String s;
        s="Numero Apolice: " + numeroApolice + "Nome: " + nomeSegurado + "\n" + enderecoSegurado + "\n" +
          "Valor Seguro: " + valorSeguro + " Premio Seguro: " + premioSeguro;
        return s;
    }
    public abstract void mostraSeguro();
}
