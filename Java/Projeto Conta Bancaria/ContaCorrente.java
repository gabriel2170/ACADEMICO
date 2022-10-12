/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Polimorfismo;

/**
 *
 * @author Orsi
 */
public class ContaCorrente extends ContaBancaria {
    
    private double taxaOperacao;
    
    public ContaCorrente(int numConta, String titular, double saldo, double taxaOperacao){
        super(numConta,titular,saldo);
        this.taxaOperacao = taxaOperacao;
    }
    
    public double getTaxaOperacao(){
        return taxaOperacao;
    }
    
    public void setTaxaOperacao(double taxaOperacao){
        this.taxaOperacao = taxaOperacao;
    }
    
    public boolean sacar(double valor){
        double s;
        s=getSaldo();
        s=s-valor-taxaOperacao;
        if (s<0){
            System.out.println("Nao ha saldo suficiente");
            return false;
        }
        else
        {
          setSaldo(s);
          return true;
        }
        
    }
    
    public boolean depositar(double valor){
        double s;
        s=getSaldo();
        s=s+valor-taxaOperacao;
        if(s<0) {
            System.out.println("Operacao nao pode ser realizada");
            return false;
        }
        else 
        {
            setSaldo(s);
            return true;
        }
    }
    
    public String toString(){
        return super.toString() + " Taxa de Operacao: " + taxaOperacao;
    }
    
    public void mostraDados(){
        System.out.println(toString());
        
    }
    
}
