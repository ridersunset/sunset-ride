'use client';
import React from 'react';
import { Hero } from './hero';
import { About } from './about';
import { Services } from './services';
import { Gallery } from './gallery';
import { Testimonials } from './testimonials';
import { Instagram } from './instagram';
import { CallToAction } from './call-to-action';
import { Contact } from './contact';

// Switch sur block.__typename ({Collection}{Field}{Template}).
// Chaque section (hors héro, visible immédiatement) est enveloppée dans un
// wrapper `.reveal` animé au scroll par ScrollReveal.
function Block({ block }: { block: any }) {
  switch (block.__typename) {
    case 'PageBlocksHero':
      return <Hero data={block} />;
    case 'PageBlocksAbout':
      return <About data={block} />;
    case 'PageBlocksServices':
      return <Services data={block} />;
    case 'PageBlocksGallery':
      return <Gallery data={block} />;
    case 'PageBlocksTestimonials':
      return <Testimonials data={block} />;
    case 'PageBlocksInstagram':
      return <Instagram data={block} />;
    case 'PageBlocksCta':
      return <CallToAction data={block} />;
    case 'PageBlocksContact':
      return <Contact data={block} />;
    default:
      return null;
  }
}

export function Blocks(props: { blocks?: any[] | null }) {
  if (!props.blocks?.length) return null;
  return (
    <>
      {props.blocks.map((block, i) => {
        if (!block) return null;
        if (block.__typename === 'PageBlocksHero') {
          return <Block block={block} key={i} />;
        }
        return (
          <div className="reveal" key={i}>
            <Block block={block} />
          </div>
        );
      })}
    </>
  );
}
