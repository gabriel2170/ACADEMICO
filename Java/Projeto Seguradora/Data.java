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
public class Data {
    
    private int dia;
    private int mes;
    private int ano;
    
    public Data (int dia, int mes, int ano){
       setData(dia,mes,ano);
    }
    
    public int getDia(){
        return dia;
    }
    
    public int getMes(){
        return mes;
    }
    
    public int getAno(){
        return ano;
    }
    
    public void setData(int dia, int mes, int ano){
        if ((dia < 1 || dia > 31) || (mes<1 || mes >12)){
            this.dia=29;
            this.mes=4;
            this.ano=2020; 
            return;}
        if (dia==31) {
           if (mes==2 || mes==4 || mes==6 || mes==9 || mes==11){
               this.dia=29;
               this.mes=4;
               this.ano=2020;
               return;
           } 
        }
        if (mes==2){
            if(dia==30 ||(dia==29 && (ano%4!=0)))
            {
                this.dia=29;
                this.mes=4;
                this.ano=2020;
                return;
            }
        }
        this.dia=dia;
        this.mes=mes;
        this.ano=ano;
        
        
    }
    
    public String toString(){
        String s;
        s=dia+"/"+mes+"/"+ano;
        return s;
    }
    
    public String getData(){
        return (toString());
    }
}
