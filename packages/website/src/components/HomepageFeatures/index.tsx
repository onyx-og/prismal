import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Card from "../../../../react/src/components/Card";
import LazyItem from "../../../../react/src/components/LazyItem";
import BrowserOnly from '@docusaurus/BrowserOnly';

type FeatureItem = {
  title: string;
  typography?: string,
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Unlocking Creativity',
    typography: 'Unleash Your Creativity',
    Svg: require('@site/static/img/undraw_design-team_51o5.svg').default,
    description: (
      <>
        This isn't just about rules; it's about possibilities.
        With highly customizable components, you're free to build unique and expressive interfaces that stand out
      </>
    ),
  },
  {
    title: 'Engineered for Efficiency',
    Svg: require('@site/static/img/undraw_lighthouse.svg').default,
    typography: 'Efficiency in Practice',
    description: (
      <>
        Built with performance in mind: prioritizes a CSS-first approach to minimize runtime overhead. This library helps you develop and deploy your applications with speed and confidence.
      </>
    ),
  },
  {
    title: 'Crafted for Responsiveness',
    Svg: require('@site/static/img/undraw_responsiveness.svg').default,
    typography: 'Seamless Responsiveness',
    description: (
      <>
        Components are crafted to adapt gracefully across various screen sizes and devices. The system ensures a consistent and seamless user experience, from desktop to mobile, making your interfaces feel native on any platform.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <Card>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </Card>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <BrowserOnly>
      {() => <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <LazyItem offset={idx*500} className={clsx('col col--4')} style={{height: "400px"}} animation='slide-up' key={idx}>
                <Feature {...props} />
              </LazyItem>
              
            ))}
          </div>
        </div>
      </section>}
    </BrowserOnly>
  );
}
