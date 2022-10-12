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
public class ContaPoupanca extends ContaBancaria {
    
    private double limite;
    
    public ContaPoupanca(int numConta, String titular, double saldo, double limite){
        super(numConta,titular,saldo);
        this.limite=limite;
    }
    public double getLimite(){
        return limite;
    }
    
    public void setLimite(double limite){
        this.limite = limite;
    }
    
    public boolean sacar(double valor){
        double s;
        s=getSaldo();
        s=s-valor;
        if(s+limite<0){
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
        s=s+valor;
        setSaldo(s);
        return true;
    }
    
    public String toString(){
        return super.toString() + " Limite: " + limite;
    }
    
    public void mostraDados(){
        System.out.println(toString());
    }
    
}
