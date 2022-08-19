import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function Dynamic(props: { slug: string; pageData: string }) {
  const { slug, pageData } = props;

  const router = useRouter();

  return (
    <section>
      <h1>{router.asPath}</h1>
      <h1>{slug}</h1>
      <p>page data: {pageData}</p>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'foo' } }, { params: { slug: 'bar' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const pageData = await (
    await import(`../../staticData/pages.json`)
  ).pages.filter((page) => page.slug === slug)[0]?.data;

  console.log(pageData);

  if (!pageData || !slug) {
    return { notFound: true };
  }

  return {
    props: { slug, pageData: pageData },
  };
};
