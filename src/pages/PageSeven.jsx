import React from "react";
import YouTube from 'react-youtube';
import ImageBar from "../components/ImageBar";

const Section = ({ id, title, children }) => (
  <div id={id} style={{ marginBottom: "40px" }}>
    <h2 style={{ color: "#2c3e50", marginBottom: "10px" }}>
      {title}
    </h2>
    <div style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
      {children}
    </div>
  </div>
);

const PageSeven = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Plastics & Circular Economy: Integrated Perspective
      </h1>
      <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
        The integration of plastics into a circular economy represents a transformative shift in how materials are produced, used, and recovered. Instead of following a linear path of production → consumption → disposal, circular systems ensure that plastic materials are continuously reused and reintegrated into the economy.
      </p>
      <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
        This approach not only reduces environmental damage but also improves resource efficiency, making plastics a key enabler of sustainable development.
      </p>

      <Section id= "p7i1" title="Role of Plastics in Circular Economy">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastics play a crucial role in enabling circularity due to their unique properties:
        </p>
        <ul>
          <li><b>Material Efficiency –</b> Lightweight and durable</li>
          <li><b>Energy Efficiency –</b> Lower energy use in production and transport</li>
          <li><b>Reduced Carbon Emissions –</b> Recycling lowers CO₂ footprint</li>
          <li><b>Recyclability –</b> Many plastics can be reprocessed multiple times</li>
          <li><b>Innovation Potential –</b> Development of biodegradable alternatives</li>
        </ul>

        <ImageBar images={["week 888/page 2/img 1.png", "week 888/page 2/img 2.png", "week 888/page 2/img 3.png"]} />
       
      </Section>

      <Section id= "p7i2" title=" Key Strategies for Circular Plastics">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            To achieve circularity in plastics, several strategies are essential:
        </p>

        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Alternative Raw Materials
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Shifting from fossil-based plastics to renewable and biodegradable materials.
        </p>
        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Waste as a Resource
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Using plastic waste in innovative ways such as road construction, bricks, and new products.
        </p>
        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
           Product Redesign
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Designing products for longer life, easy recycling, and minimal waste generation.
        </p>
        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Consumer Awareness
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Encouraging responsible behavior and eliminating the “throwaway culture”.
        </p>
        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
           Collaboration
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Integrating efforts across industries, governments, and consumers to build a sustainable system.
        </p>


        <ImageBar images={["week 888/page 3/img 5.png", "week 888/page 3/img 6.png", "week 888/page 3/img 7.png"]} />

      
      </Section>

      <Section id= "p7i3" title="Objectives of Circular Economy for Plastics">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The core objectives of a circular plastic economy include:
        </p>
        <ul>
          <li>Designing out waste and pollution from the system</li>
          <li>Keeping products and materials in continuous use</li>
          <li>Regenerating natural systems by mimicking nature’s cycles</li>
          <li>Reducing dependence on finite resources</li>
          <li>Transitioning to renewable energy sources</li>
          <li>Enhancing social, economic, and environmental well-being</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This approach aligns closely with sustainability principles but provides a more practical and action-oriented framework.
        </p>

        <ImageBar images={["week 888/page 4/img 8.png"]} />
      </Section>

      <Section id= "p7i4" title="From Reactive to Proactive Systems">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Traditional waste management focuses on reactive solutions—cleaning up waste after it is generated.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Circular economy, however, promotes a proactive approach, where products are designed to prevent waste from being created in the first place.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This shift requires collaboration across multiple disciplines, including engineering, design, business, and policy-making.
        </p>

        <ImageBar images={["week 888/page 5/img 9.png", "week 888/page 5/img 10.png", "week 888/page 5/img 11.png"]} />
       
      </Section>

      <Section id= "p7i5" title="Why Circular Economy Matters">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The importance of circular economy is driven by several global challenges:
        </p>
        <ul>
          <li>Rising levels of plastic waste in oceans and landfills</li>
          <li>Limited natural resources and increasing demand</li>
          <li>Environmental pollution affecting ecosystems and wildlife</li>
          <li>Need for sustainable economic growth</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            By adopting circular practices, we can reduce waste, improve resource productivity, and create new economic opportunities.
        </p>

        <ImageBar images={["week 888/page 6/img 12.png", "week 888/page 6/img 13.png", "week 888/page 6/img 14.png"]} />
      </Section>

      <Section id= "p7i6" title="Industry Example: Sustainable Innovation">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Many global companies are already adopting circular strategies. These include:
        </p>       
        <ul>
          <li>Reducing packaging material while maintaining product quality</li>
          <li>Using recycled content in manufacturing</li>
          <li>Designing packaging that is fully recyclable or compostable</li>
          <li>Collaborating with stakeholders to improve recycling infrastructure</li>
          <li>Investing in innovation and sustainable technologies</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Such initiatives demonstrate how businesses can lead the transition toward a circular plastic economy.
        </p>

        <ImageBar images={["week 888/page 7/img 16.png", "week 888/page 7/img 17.png", "week 888/page 7/img 18.png"]} />
      </Section>

     

      <Section id= "p7i7" title="The Way Forward">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The future of plastic management lies in innovation, collaboration, and systemic change. Engineers, businesses, policymakers, and consumers must work together to:
        </p>
        <ul>
          <li>Develop smarter materials</li>
          <li>Improve recycling technologies</li>
          <li>Promote sustainable consumption</li>
          <li>Build efficient waste management systems</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The goal is clear: a world where waste is eliminated, and materials continuously flow within a sustainable cycle.
        </p>

        <ImageBar images={["week 888/page 8/img 19.png", "week 888/page 8/img 20.png", "week 888/page 8/img 21.png"]} />
      </Section>

      <Section id= "p7i8" title="Sustainable Packaging Strategies">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            To reduce environmental impact, companies are adopting multiple packaging strategies:
        </p>
        <ul>
          <li><b>Reducing Material Usage –</b> Using lighter yet stronger materials</li>
          <li><b>Increasing Recycled Content –</b> Incorporating recycled plastic into packaging</li>
          <li><b>Designing for Recyclability –</b> Avoiding complex multi-layer materials</li>
          <li><b>Compostable Alternatives –</b> Using biodegradable materials where possible</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A major challenge lies in multi-layer packaging, which is difficult to recycle due to the complexity of separating different materials. This often leads to disposal in landfills or incineration.
        </p>

        <ImageBar images={["week 888/page 9/img 22.png", "week 888/page 9/img 23.png", "week 888/page 9/img 24.png"]} />
      </Section>


      <Section id= "p7i9" title="Innovation in Product Design">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Product innovation plays a key role in circular systems. Companies are exploring:
        </p>
        <ul>
          <li><b>Concentrated Products   –</b> Smaller packaging with same functionality</li>
          <li><b>Compressed Formats –</b> Reduced material and transport costs</li>
          <li><b>Lifecycle-Based Design –</b> Using tools like lifecycle assessment (LCA)  </li>
          <li><b>Material Optimization –</b> Reducing even small amounts (grams) of packaging</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Even minor reductions in material usage can lead to significant environmental and economic benefits at scale.
        </p>

        <ImageBar images={["week 888/page 10/img 25.png", "week 888/page 10/img 26.png", "week 888/page 10/img 27.png"]} />
      </Section>


      <Section id= "p7i10" title="Recapturing Packaging & Recycling">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A critical step in circular economy is recapturing used packaging:
        </p>
        <ul>
          <li>Collecting post-consumer plastic waste</li>
          <li>Sorting and processing recyclable materials</li>
          <li>Reintroducing materials into production</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            However, challenges include:
        </p>
        <ul>
          <li>Limited recycling infrastructure</li>
          <li>Regulatory restrictions (e.g., food-grade recycled plastics)</li>
          <li>Economic viability of collection systems</li>
        </ul>

        <ImageBar images={["week 888/page 11/img 29.png", "week 888/page 11/img 30.png", "week 888/page 11/img 31.png"]} />
      </Section>

      <Section id= "p7i11" title=" Industry Collaboration & Global Initiatives">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Circular economy cannot succeed in isolation. It requires collaboration across industries and stakeholders:
        </p>
        <ul>
          <li>Partnerships with global organizations and research institutions</li>
          <li>Development of standardized recycling guidelines</li>
          <li>Transparent communication across supply chains</li>
          <li>Alignment with existing recycling infrastructure</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Such collaboration ensures that innovations are practical, scalable, and effective.
        </p>

        <ImageBar images={["week 888/page 12/img 32.png", "week 888/page 12/img 33.png", "week 888/page 12/img 34.png"]} />
        
      </Section>


      <Section id= "p7i12" title=" Role of Government & Infrastructure">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Governments play a vital role by:
        </p>
        <ul>
          <li>Developing waste management infrastructure</li>
          <li>Implementing Extended Producer Responsibility (EPR) policies</li>
          <li>Supporting recycling industries through incentives</li>
          <li>Creating regulatory frameworks for sustainable practices</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Without proper infrastructure, even well-designed circular systems cannot function effectively.
        </p>

        <ImageBar images={["week 888/page 13/img 35.png", "week 888/page 13/img 36.png"]} />
        
      </Section>


      <Section id= "p7i13" title=" Extended Producer Responsibility (EPR)">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Extended Producer Responsibility (EPR) is a key policy tool in circular economy.
        </p>
        <ul>
          <li>Producers are responsible for managing their products after use</li>
          <li>They fund or manage collection, recycling, and disposal systems</li>
          <li>Products are designed for easier recycling from the beginning</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This shifts responsibility from consumers alone to producers and the entire value chain, improving efficiency and accountability.
        </p>

        <ImageBar images={["week 888/page 14/img 37.png", "week 888/page 14/img 38.png"]} />
        
      </Section>

      <Section id= "p7i14" title=" Global Impact of Plastic Circular Economy">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          Effective plastic waste management through circular economy practices has a significant environmental impact. If plastic waste is properly recycled and utilized for energy recovery, it can reduce millions of tons of greenhouse gas emissions globally.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This reduction plays a crucial role in addressing climate change, as carbon dioxide (CO₂) emissions are a major contributor to global warming and extreme weather patterns.
        </p>
        <ImageBar images={["week 888/page 15/img 39.png", "week 888/page 15/img 40.png", "week 888/page 15/img 41.png"]} />
        
      </Section>


      <Section id= "p7i15" title=" Climate Change & Plastic Waste">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic waste is closely linked to environmental challenges such as:
        </p>
        <ul>
          <li>Rising global temperatures</li>
          <li>Extreme weather events (floods, heatwaves, storms)</li>
          <li>Ocean pollution and ecosystem damage</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            By improving recycling and reducing landfill disposal, we can significantly lower carbon emissions and environmental degradation
        </p>

        <ImageBar images={["week 888/page 16/img 43.png", "week 888/page 16/img 44.png"]} />
        
      </Section>


      <Section id= "p7i16" title=" Benefits of Improved Plastic Management">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A well-designed circular plastic system offers multiple benefits:
        </p>
        <ul>
          <li>Reduction in greenhouse gas emissions</li>
          <li>Lower dependence on fossil fuels</li>
          <li>Increased resource efficiency</li>
          <li>Creation of new jobs in recycling and waste management sectors</li>
          <li>Reduced landfill burden and pollution</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            These benefits make circular economy both an environmental and economic opportunity.
        </p>

        <ImageBar images={["week 888/page 17/img 45.png", "week 888/page 17/img 46.png", "week 888/page 17/img 47.png"]} />
        
      </Section>


      <Section id= "p7i17" title=" European Circular Economy Vision">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The European Union has set ambitious goals for plastic circularity
        </p>
        <ul>
          <li>100% recyclable or reusable plastic packaging by 2030</li>
          <li>More than 50% recycling rate for plastic waste</li>
          <li>Development of advanced sorting and recycling infrastructure</li>
          <li>Creation of new jobs in green sectors</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            These initiatives demonstrate how policy, technology, and industry collaboration can drive large-scale change.
        </p>

        <ImageBar images={["week 888/page 18/img 48.png", "week 888/page 18/img 49.png", "week 888/page 18/img 50.png"]} />
        
      </Section>


      <Section id= "p7i18" title=" Example: UK Plastic Pact">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The UK Plastic Pact outlines key targets:
        </p>
        <ul>
          <li>100% plastic packaging to be reusable, recyclable, or compostable by 2025</li>
          <li>70% of plastic packaging to be effectively recycled</li>
          <li>Elimination of unnecessary single-use plastics</li>
          <li>Increased use of recycled content in packaging</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Such initiatives highlight the importance of industry-government collaboration in achieving sustainability goals.
        </p>

        <ImageBar images={["week 888/page 20/img 51.png", "week 888/page 20/img 52.png"]} />
        
      </Section>


      <Section id= "p7i19" title=" Case Study: Waste-Free Ontario">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Ontario, Canada, has implemented a long-term strategy for a waste-free economy:
        </p>
        <ul>
          <li>30% waste diversion by 2020</li>
          <li>50% by 2030</li>
          <li>80% by 2050</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The strategy emphasizes:
        </p>
        <ul>
          <li>Extended Producer Responsibility (EPR)</li>
          <li>Resource recovery systems</li>
          <li>Government oversight and regulation</li>
        </ul>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This gradual, realistic approach ensures sustainable and achievable progress
        </p>
        
      </Section>


      <Section id= "p7i20" title=" Data-Driven Waste Management">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Effective waste management requires accurate data and analysis. By tracking how plastic moves through the system—collection, sorting, recycling, and disposal—we can:
        </p>
        <ul>
          <li>Identify inefficiencies</li>
          <li>Reduce waste leakage</li>
          <li>Improve recycling rates</li>
          <li>Optimize resource recovery</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
           Data-driven decision-making is essential for building efficient circular systems.
        </p>
        
      </Section>


      <Section id= "p7i21" title=" Key System Improvements Needed">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            To achieve a circular plastic economy, several improvements are necessary:
        </p>
        <ul>
          <li>Efficient collection and sorting systems</li>
          <li>Better product design for recyclability</li>
          <li>Investment in recycling infrastructure</li>
          <li>Market development for recycled materials</li>
          <li>Collaboration across all stakeholders</li>
        </ul>
       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
           A holistic systems approach is required rather than isolated efforts.
        </p>
        
      </Section>


      <Section id= "p7i22" title="Local Action, Global Impact">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Although plastic pollution is a global issue, solutions must be implemented locally. Each region must design systems based on:
        </p>
        <ul>
          <li>Local infrastructure</li>
          <li>Economic conditions</li>
          <li>Social behavior</li>
          <li>Technological capabilities</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
           This ensures that solutions are practical, effective, and sustainable.
        </p>
        
      </Section>


      <Section id= "p7i23" title="Collaboration & Innovation">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The success of circular economy depends on:
        </p>
        <ul>
          <li>Collaboration between governments, industries, and consumers</li>
          <li>Continuous innovation in materials and processes</li>
          <li>Long-term investment in sustainable systems</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
           Companies must adopt a long-term vision, focusing on sustainability alongside profitability.
        </p>
        
      </Section>

    </div>
  );
};

export default PageSeven;