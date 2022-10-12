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
public class Banco {
    
    private ContaBancaria contas[]=new ContaBancaria[100];
    // todas as posicoes do vetor de 0 a 99 tem o valor null
    
    public void inserirConta(ContaBancaria conta){
    
        for (int i = 0; i < contas.length; i++) {
            if (contas[i]==null){
                contas[i]=conta;
                System.out.println("Conta incluida");
                return;
            }
            
        }
        System.out.println("Nao ha posicao disponivel para inserir a conta");
        
    }
    
    public void removerConta(int numConta){
        
        for (int i = 0; i < contas.length; i++) {
            if (contas[i]!=null){
                if(contas[i].getNumConta()==numConta){
                    contas[i]=null;
                    return;
                }
            }
        }
        System.out.println("Conta nao encontrada");
    }
    
    public ContaBancaria procurarConta(int numConta){
        
        for (int i = 0; i < contas.length; i++) {
            if (contas[i]!=null){
                if(contas[i].getNumConta()==numConta){
                    return contas[i];
                }
            }
            
        }
        
        return null;
    }
}
