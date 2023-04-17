import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button1 } from '../../../components/Button1';
import { Header } from '../../../components/Header';
import { Quantity } from '../../../components/Quantity';
import { useAppContext } from '../../../contexts/app';
import { useApi } from '../../../lib/useApi';
import { useFormatter } from '../../../lib/useFormatter';
import styles from '../../../styles/Product-id.module.css';
import { Tenant } from '../../../types/Tenant';
import { onValue, push, ref, set } from '@firebase/database';
import { rtdb } from '../../../firebase/rtdb';
import { auth } from '../../../firebase/auth';


const Item = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context
  const [nome, setNome] = useState('');
  const [preco, setPreco]: any = useState(0);
  const [imagem, setImagem] = useState("");
  const [qtCount, setQtCount]: any = useState(1);
  const [opc, setOpc] = useState('')
  const [key, setKey] = useState('')
  const user = auth.currentUser
  const id = user?.uid

  useEffect(() => {

    setTenant(data.tenant);
    const refData = ref(rtdb, 'TempItem/');
    onValue(refData, (doc) => {
      setKey(doc.val().id)
      setNome(doc.val().nome)
      setPreco(doc.val().preco)
      setImagem(doc.val().imagem)
      setOpc(doc.val().opc)
    })

  }, []);

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount)
  }

  const handleUpdatePr = (newPrice: number) => {
    setPreco(newPrice)
  }

  const handleAddToCart = async () => {

    if (data.tenant.slug == 'delivery1') {
      const lista = ref(rtdb, `Carrinho_1/${id}/${key}`)
      

      set(lista, {
        imagem,
        nome,
        preco,
        qtCount,
        opc
      })
      alert('Item adicionado ao Carrinho!!')
    }

    if (data.tenant.slug == 'delivery2') {
      const lista = ref(rtdb, `Carrinho_2/${id}/${key}`)
      

      set(lista, {
        imagem,
        nome,
        preco,
        qtCount,
        opc
      })
      alert('Item adicionado ao Carrinho!!')
    }

    if (data.tenant.slug == 'delivery3') {
      const lista = ref(rtdb, `Carrinho_3/${id}/${key}`)
      

      set(lista, {
        imagem,
        nome,
        preco,
        qtCount,
        opc
      })
      alert('Item adicionado ao Carrinho!!')
    }


    if (data.tenant.slug == 'delivery4') {
      const lista = ref(rtdb, `Carrinho_4/${id}/${key}`)
      

      set(lista, {
        imagem,
        nome,
        preco,
        qtCount,
        opc
      })
      alert('Item adicionado ao Carrinho!!')
    }
  }
  const formatter = useFormatter();

  return (
    <div className={styles.container}>
      <Head>
        <title> {nome} | {data.tenant.name} </title>
      </Head>

      <div className={styles.headerArea}>
        <Header
          color={data.tenant.primaryColor}
          backHref={'/' + data.tenant.slug}
          invert
        />
      </div>

      <div className={styles.headerBg} style={{ backgroundColor: data.tenant.primaryColor }}></div> {/* parte de cima da pagina */}

      <div className={styles.productImage}>
        <img src={imagem} />
      </div>


      <div className={styles.title} style={{ borderBottomColor: data.tenant.primaryColor }}>{nome}</div>
      <div className={styles.line}></div>

      <div className={styles.category}>{opc}</div>

      <div className={styles.qtText}>Quantidade</div>
      <div className={styles.area}>
        <div className={styles.arealeft}>
          <Quantity
            color={data.tenant.primaryColor}
            price={preco}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            onUpdatePrice={handleUpdatePr}
            min={1}
          />
        </div>

        <div className={styles.areaRight} style={{ color: data.tenant.primaryColor }}>
          {formatter.formatPrice(preco)}
        </div>
      </div>

      <div className={styles.button}>
        <Button1
          color={data.tenant.primaryColor}
          label="Adicionar a sacola"
          fill
          onClick={handleAddToCart} />
      </div>
    </div>
  );
}

export default Item;

type Props = {
  tenant: Tenant
}

// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;
  console.log('Tenant: ', tenantSlug)
  const api = useApi(tenantSlug as string);
  const tenant = await api.getTenant();

  // Selecionando o tenant
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

  // Retornando tenant e o produto
  return {
    props: {
      tenant,
    }
  }
}