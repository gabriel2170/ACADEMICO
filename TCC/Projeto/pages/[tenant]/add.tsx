import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import { useFormatter } from '../../lib/useFormatter';
import styles from '../../styles/Add.module.css';
import { Tenant } from '../../types/Tenant';
import { rtdb } from '../../firebase/rtdb';
import { ref, push, set } from "firebase/database";


const Add = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context

  useEffect(() => {
    setTenant(data.tenant);
  }, []); // Setando o tenant no context para pegar as informações

  const [imagem, setImagem] = useState('');
  const [name, setName] = useState('');
  const [opc, setOpc] = useState('');
  const [preco, setPreco] = useState(0);


  function Cadastrar() {

    if (data.tenant.slug == 'delivery1') {
      const lista = ref(rtdb, 'Pizzaria do Tiao')
      const addDados = push(lista)

      set(addDados, {
        imagem,
        name,
        preco,
        opc,

      })

      alert('Item Cadastrado com Sucesso!')

      setImagem('')
      setName('')
      setOpc('')
      setPreco(0)
    }

    if (data.tenant.slug == 'delivery2') {
      const lista = ref(rtdb, 'Cervejaria da Marlene')
      const addDados = push(lista)

      set(addDados, {
        imagem,
        name,
        preco,
        opc,

      })

      alert('Item Cadastrado com Sucesso!')

      setImagem('')
      setName('')
      setOpc('')
      setPreco(0)
    }

    if (data.tenant.slug == 'delivery3') {
      const lista = ref(rtdb, 'Ze do Burguer')
      const addDados = push(lista)

      set(addDados, {
        imagem,
        name,
        preco,
        opc,
      })

      alert('Item Cadastrado com Sucesso!')

      setImagem('')
      setName('')
      setOpc('')
      setPreco(0)
    }
    if (data.tenant.slug == 'delivery4') {
      const lista = ref(rtdb, 'Sorveteria do Lionel')
      const addDados = push(lista)

      set(addDados, {
        imagem,
        name,
        preco,
        opc,
      })

      alert('Item Cadastrado com Sucesso!')

      setImagem('')
      setName('')
      setOpc('')
      setPreco(0)
    }

  }


  const formatter = useFormatter();


  return (
    <div className={styles.container}>
      <Head>
        <title>Cadastro de Refeicao | {data.tenant.name} </title>
      </Head>

      <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
        <Header
          color={data.tenant.primaryColor}
          backHref={'/' + data.tenant.slug + '/admin'}
          invert
        />
      </div>

      <div className={styles.titleArea}>
        <div className={styles.title}>Cadastro | {data.tenant.name} </div>

        <div className={styles.line1}></div>
      </div>

      <div className={styles.form}>

        <div className={styles.formItem}>{'Link da Imagem (URL) '}
          <input type="text" value={imagem} className={styles.input} onChange={(e) => { setImagem(e.target.value) }} />
        </div>

        <div className={styles.formItem} >{'Nome '}
          <input type="text" value={name} className={styles.input} onChange={(e) => { setName(e.target.value) }} />
        </div>

        <div className={styles.formItem}>{'Ingredientes '}
          <input type="text" value={opc} className={styles.input} onChange={(e) => { setOpc(e.target.value) }} placeholder='Descrição ' />
        </div>

        <div className={styles.formItem}>{'Preço '}
          <input type="number" value={preco} className={styles.input} onChange={(e) => { setPreco(e.target.valueAsNumber) }} placeholder='R$' />
        </div>

      </div>

      <div className={styles.line2}></div>

      <div className={styles.button}>
        <Button1
          color={data.tenant.primaryColor}
          label="Cadastrar Produto"
          fill
          onClick={Cadastrar} />
      </div>

    </div>
  );
}

export default Add;



// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
  tenant: Tenant

}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;
  console.log('Tenant: ', tenantSlug)
  const api = useApi(tenantSlug as string);
  const tenant = await api.getTenant();



  // Selecionando o tenant
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  }

  return {
    props: {
      tenant,
    }
  }

}