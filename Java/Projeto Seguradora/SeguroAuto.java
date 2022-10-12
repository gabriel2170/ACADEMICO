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
public class SeguroAuto extends Seguro{
    private double franquia;
    private String renavam;
    private String marca;
    private String modelo;
    private int anoFabricacao;
    private int anoModelo;
    
    public SeguroAuto (int numeroApolice, String nomeSegurado, Endereco enderecoSegurado,
                  double valorSeguro, double premioSeguro, double franquia, String renavam, String marca,
                  String modelo, int anoFabricacao, int anoModelo){
        super(numeroApolice,nomeSegurado,enderecoSegurado,valorSeguro,premioSeguro);
        this.franquia = franquia;
        this.renavam=renavam;
        this.marca=marca;
        this.modelo=modelo;
        this.anoFabricacao=anoFabricacao;
        this.anoModelo=anoModelo;
        
    }

    public double getFranquia() {
        return franquia;
    }

    public void setFranquia(double franquia) {
        this.franquia = franquia;
    }

    public String getRenavam() {
        return renavam;
    }

    public void setRenavam(String renavam) {
        this.renavam = renavam;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getAnoFabricacao() {
        return anoFabricacao;
    }

    public void setAnoFabricacao(int anoFabricacao) {
        this.anoFabricacao = anoFabricacao;
    }

    public int getAnoModelo() {
        return anoModelo;
    }

    public void setAnoModelo(int anoModelo) {
        this.anoModelo = anoModelo;
    }
    
    public String toString(){
        String s;
        s = super.toString() + "\n Franquia: " + franquia + " Renavam: " + renavam + " Marca: " + marca +
                "Modelo " + modelo;
        return s;
    } 
    
    public void mostraSeguro(){
        System.out.println("Seguro Auto");
        System.out.println(toString());
    }
    
    
}
