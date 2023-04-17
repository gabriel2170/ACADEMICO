import { GetServerSideProps } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { Banner } from '../../components/Banners';
import { useFormatter } from '../../lib/useFormatter';
import { Sidemenu } from '../../components/Sidemenu';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/Home.module.css';
import styles2 from '../../styles/Cardapio.module.css';
import { Tenant } from '../../types/Tenant';
import { rtdb } from '../../firebase/rtdb';
import { auth } from '../../firebase/auth';
import { onValue, ref, set } from '@firebase/database';
import Head from 'next/head';


type Refeicao = {
  imagem: string;
  chave: string,
  name: string,
  preco: number,
  opc: string
}

type Usuarios = {
  chave: string;
  email: string;
  nome: string;
}

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context
  const formatter = useFormatter();
  const user = auth.currentUser
  const [refeicao, setRefeicao] = useState<Refeicao[]>()
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState<Refeicao[]>()
  const [buscando, setBuscando] = useState(false)

  useEffect(() => {
    setTenant(data.tenant);

    if (data.tenant.slug == 'delivery1') {
      const lista = ref(rtdb, 'Pizzaria do Tiao')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)

      }, { onlyOnce: true })

    }
    if (data.tenant.slug == 'delivery2') {
      const lista = ref(rtdb, 'Cervejaria da Marlene')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)

      }, { onlyOnce: true })

    }
    if (data.tenant.slug == 'delivery3') {
      const lista = ref(rtdb, 'Ze do Burguer')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)

      }, { onlyOnce: true })

    }

    if (data.tenant.slug == 'delivery4') {
      const lista = ref(rtdb, 'Sorveteria do Lionel')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)

      }, { onlyOnce: true })

    }

  }, []);



  async function dadosLogin() {
    const id = ref(rtdb, 'Usuarios')
    onValue(id, (res) => {
      Object.entries<Usuarios>(res.val() ?? {}).map(([chave, valor]) => {
        if (valor.email == user?.email) {
          setTag(valor.nome)
        }
      })


    }, { onlyOnce: true })
  }

  dadosLogin();

  async function itensCart(chave: string, nome: string, preco: number, opc: string, imagem: string) {
    set(ref(rtdb, 'TempItem/'), {
      id: chave,
      nome: nome,
      preco: preco,
      opc: opc,
      imagem: imagem
    });
  }

  function busca(event: FormEvent) {

    const palavra = event.target.value

    if (palavra.length > 0) {
      setBuscando(true)
      const dados = new Array

      refeicao?.map(itens => {
        const regra = new RegExp(event.target.value, "gi")
        if (regra.test(itens.name)) {
          dados.push(itens)
        }
      })

      setSearch(dados)
    } else {
      setBuscando(false)
    }


  }

  const [SidemenuOpen, setSidemenuOpen] = useState(false);

  return (
    <div className={styles.container}>

      <Head>
        <title> Pagina inicial | {data.tenant.name}</title>
      </Head>

      <header className={styles.header}>

        <div className={styles.headerTop}>

          <div className={styles.headerTopLeft}>
            <div className={styles.headerTittle}>{user == null ? "Bem Vindo(a)" : `Seja bem vindo(a) ${tag}`}</div>
            <div className={styles.headerSubTittle}>O que deseja pra hoje?</div>

            <div className={styles.search} style={{ border: "1px solid" + tenant?.primaryColor }}>
              <input type="text" placeholder='Buscar' onChange={busca} className={styles.searchItem} style={{}} />
            </div>
          </div>



          <div className={styles.headerTopRight}>
            <div className={styles.menuButton}
              onClick={() => setSidemenuOpen(true)}>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.primaryColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.primaryColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.primaryColor }}></div>
            </div>

            <Sidemenu
              tenant={data.tenant}
              open={SidemenuOpen}
              onClose={() => setSidemenuOpen(false)}
            />

          </div>
        </div>
      </header>

      <Banner />

      <div className={styles2.grid}>
        {buscando ?

          search?.map(itens => {

            return (
              <a className={styles2.container} key={itens.chave} href={user == null ? data.tenant.slug + '/login/' : data.tenant.slug + '/product/' + itens.chave} onClick={() => itensCart(itens.chave, itens.name, itens.preco, itens.opc, itens.imagem)}>
                <div className={styles2.head} style={{ backgroundColor: tenant?.primaryColor }}></div>
                <div className={styles2.info}>

                  <div className={styles2.img}>
                    <img src={itens.imagem} />
                  </div>

                  <div className={styles2.infoTitle} id='nome'>{itens.name}</div>
                  <div className={styles2.infoItem}>{itens.opc}</div>
                  <div className={styles2.infoPrice} style={{ color: tenant?.primaryColor }}>{formatter.formatPrice(itens.preco)}</div>

                </div>
              </a>

            )
          })
          :
          refeicao?.map(itens => {

            return (
              <a className={styles2.container} key={itens.chave} href={user == null ? data.tenant.slug + '/login/' : data.tenant.slug + '/product/' + itens.chave} onClick={() => itensCart(itens.chave, itens.name, itens.preco, itens.opc, itens.imagem)}>
                <div className={styles2.head} style={{ backgroundColor: tenant?.primaryColor }}></div>
                <div className={styles2.info}>

                  <div className={styles2.img}>
                    <img src={itens.imagem} />
                  </div>

                  <div className={styles2.infoTitle} id='nome'>{itens.name}</div>
                  <div className={styles2.infoItem}>{itens.opc}</div>
                  <div className={styles2.infoPrice} style={{ color: tenant?.primaryColor }}>{formatter.formatPrice(itens.preco)}</div>

                </div>
              </a>

            )
          })
        }
      </div>
    </div>
  );
}

export default Home;



// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  // Selecionando o tenant
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

  // Pegando os products e recebendo um array
  const products = await api.getAllProducts();


  return {
    props: {
      tenant,
      products
    }
  }

}

function onUpdatingServerName(event: FormEvent<Element>, arg1: any) {
  throw new Error('Function not implemented.');
}
