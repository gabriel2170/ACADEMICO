import { onValue, ref, set } from '@firebase/database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../../components/Button1';
import { Header } from '../../../components/Header';
import { useAppContext } from '../../../contexts/app';
import { rtdb } from '../../../firebase/rtdb';
import { useApi } from '../../../lib/useApi';
import { useFormatter } from '../../../lib/useFormatter';
import styles from '../../../styles/Change.module.css';
import { Tenant } from '../../../types/Tenant';

const Change = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState("");
  const [id, setId] = useState('')
  const [opc, setOpc] = useState('')

  useEffect(() => {
    setTenant(data.tenant);
    const refData = ref(rtdb, 'itensToUpdate/');
    onValue(refData, (doc) => {
      setId(doc.val().id)
      setNome(doc.val().nome)
      setPreco(doc.val().preco)
      setImagem(doc.val().imagem)
      setOpc(doc.val().opc)
    })
  }, []); // Setando o tenant no context para pegar as informações

  const Alterar = async () => {
    if (data.tenant.slug == 'delivery1') {
      set(ref(rtdb, `Pizzaria do Tiao/${id}`), {
        imagem: imagem,
        name: nome,
        preco: preco,
        opc: opc
      })
      alert('Item Atualizado!!')

      set(ref(rtdb, `itensToUpdate/${id}`), {
        id: null
      })
      router.push('/' + data.tenant.slug + '/admin')
    }

    if (data.tenant.slug == 'delivery2') {
      set(ref(rtdb, `Cervejaria da Marlene/${id}`), {
        imagem: imagem,
        name: nome,
        preco: preco,
        opc: opc
      })

      alert('Item Atualizado!!')

      set(ref(rtdb, `itensToUpdate/${id}`), {
        id: null
      })
      router.push('/' + data.tenant.slug + '/admin')
    }

    if (data.tenant.slug == 'delivery3') {
      set(ref(rtdb, `Ze do Burguer/${id}`), {
        imagem: imagem,
        name: nome,
        preco: preco,
        opc: opc
      })
      alert('Item Atualizado!!')

      set(ref(rtdb, `itensToUpdate/${id}`), {
        id: null
      })
      router.push('/' + data.tenant.slug + '/admin')
    }
    if (data.tenant.slug == 'delivery4') {
      set(ref(rtdb, `Sorveteria do Lionel/${id}`), {
        imagem: imagem,
        name: nome,
        preco: preco,
        opc: opc
      })
      alert('Item Atualizado!!')

      set(ref(rtdb, `itensToUpdate/${id}`), {
        id: null
      })
      router.push('/' + data.tenant.slug + '/admin')
    }
  }

  const formatter = useFormatter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Alteração de refeição | {data.tenant.name} </title>
      </Head>

      <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
        <Header
          color={data.tenant.primaryColor}
          backHref={'/' + data.tenant.slug + '/admin'}
          invert
        />
      </div>

      <div className={styles.titleArea}>
        <div className={styles.title}>Alteração | {data.tenant.name} </div>

        <div className={styles.line1}></div>
      </div>

      <div className={styles.form}>

        <div className={styles.productImage}>
          <img src={imagem} className={styles.image} />
        </div>

        <div className={styles.formItem}>{'Link da Imagem (URL) '}
          <input type="text" value={imagem} className={styles.input} onChange={(e) => { setImagem(e.target.value) }} placeholder={`${imagem}`} />
        </div>

        <div className={styles.formItem} >{'Nome '}
          <input type="text" value={nome} className={styles.input} onChange={(e) => { setNome(e.target.value) }} placeholder={`${nome}`} />
        </div>

        <div className={styles.formItem}>{'Ingredientes '}
          <input type="text" value={opc} className={styles.input} onChange={(e) => { setOpc(e.target.value) }} placeholder={`${opc}`} />
        </div>

        <div className={styles.formItem}>{'Preço '}
          <input type="number" value={preco} className={styles.input} onChange={(e) => { setPreco(e.target.valueAsNumber) }} placeholder={`R$ ${preco}`} />
        </div>

      </div>

      <div className={styles.line2}></div>

      <div className={styles.button}>
        <Button1
          color={data.tenant.primaryColor}
          label="Alterar Produto"
          fill
          onClick={Alterar} />
      </div>
      
    </div>



  );
}

export default Change;



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
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

  // Pegando o product


  // Retornando tenant e o produto
  return {
    props: {
      tenant,


    }
  }

}

function setQtd(name: any) {
  throw new Error('Function not implemented.');
}
