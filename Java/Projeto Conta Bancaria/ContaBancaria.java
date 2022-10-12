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
public abstract class ContaBancaria {
    private int numConta;
    private String titular;
    private double saldo;
    
    public ContaBancaria(int numConta, String titular, double saldo){
        this.numConta = numConta;
        this.titular = titular;
        this.saldo = saldo;
    }
    
    public int getNumConta(){
        return numConta;
    }
    
    public void setNumConta(int numConta){
        this.numConta = numConta;
    }
    
    public String getTitular(){
        return titular;
    }
    
    public void setTitular(String titular){
        this.titular = titular;
    }
    
    public double getSaldo(){
        return saldo;
    }
    
    public void setSaldo(double saldo){
        this.saldo = saldo;
    }
    
    public String toString(){
        return "NumConta: " + numConta + " Titular: " + titular + " Saldo: " + saldo;
    }
    
    public void transferir(ContaBancaria conta, double valor){
        boolean resultadoOperacao;
        resultadoOperacao = sacar(valor);
        if(resultadoOperacao){
            conta.depositar(valor);
        }
        else
        {
            System.out.println("Nao foi possivel realizar a transferencia");
        }
    }
    
    public abstract boolean sacar(double valor);
    
    public abstract boolean depositar(double valor);
    
    public abstract void mostraDados();
}
