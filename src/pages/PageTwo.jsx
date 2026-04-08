import React from "react";
import YouTube from 'react-youtube';
import ImageSection from '../components/ImageSection'

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

const PageTwo = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Introduction to Plastic Waste
      </h1>

      <Section  id= "p2i1" title="The Plastic Crisis: From Material Utility to Global Environmental Threat">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic, once hailed as a revolutionary material for its durability, versatility, and low cost, has transitioned into one of the most significant environmental challenges of the modern era. Plastic waste is not a standalone category of pollution but a dominant and persistent component of the broader global solid waste stream. Unlike organic materials, paper, or even some metals, plastic does not decompose in any meaningful human timeframe. Instead, it undergoes a process of fragmentation, breaking into smaller and smaller pieces that permeate every corner of our planet—from the deepest ocean trenches to the very air we breathe.
        </p>

        <ImageSection src= 'hardikimages/image 6.png' />
       
      </Section>

      <Section id= "p2i2" title="The Genesis of Plastic Waste: Consumption and Packaging">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The primary driver of the plastic waste crisis is the linear "take-make-dispose" model of consumption. While plastic is utilized in building and construction (6%), automotive manufacturing (5%), and electronics, these sectors typically involve long-term use. The overwhelming majority of plastic waste—approximately 63%—originates from the packaging sector. Packaging is particularly problematic because it has an incredibly short lifecycle; a plastic wrapper or container often becomes waste within minutes of being opened.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The technical definition of solid waste includes non-liquid, non-soluble materials from households and industries. Plastic waste specifically refers to the accumulation of these materials in the environment where they negatively affect ecosystems. Because plastic persists for hundreds of years, the "disposable" nature of packaging creates a massive volume of waste that our current management systems are struggling to contain.
        </p>
        <ImageSection src= 'hardikimages/image 15.png' />

        

      </Section>

      <Section id= "p2i3" title="The Anatomy of Mismanagement: Segregation and Contamination">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            One of the most significant hurdles in addressing this issue is the lack of proper waste segregation. When plastic is thrown into a general bin along with food scraps and organic matter, it becomes contaminated. This mixing reduces the quality of the plastic and makes the recycling process significantly more difficult and expensive.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Effective management begins at the point of generation. Source segregation—the practice of separating plastics, organics, and other recyclables at home or in the workplace—is the most critical step in ensuring that plastic remains a resource rather than a pollutant. Proper segregation improves recycling efficiency and prevents high-quality polymers from ending up in landfills or, worse, the natural environment.
        </p>

        <ImageSection src= 'hardikimages/image 8.png' />
      </Section>

      <Section id= "p2i4" title="Pathways of Pollution: Land Litter and Urban Systems">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            When plastic waste is improperly discarded, it becomes "land litter." This is the most visible form of pollution, seen along roadsides, railway tracks, and public spaces. The impact of land litter is twofold. First, it poses a direct threat to terrestrial wildlife. Animals such as cows, dogs, and goats often consume plastic when it is mixed with discarded food waste. Since plastic is indigestible, it accumulates in their stomachs, leading to malnutrition, intestinal blockage, and eventually a painful death.
        </p>
        <ImageSection src= 'hardikimages/image 11.png' />
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Second, land litter is mobile. Through the forces of wind and rain, improperly managed plastic is carried into urban drainage networks. This leads to the clogging of drains, a major factor in "urban flooding" during monsoon seasons. These blocked systems also create stagnant water pools, which serve as breeding grounds for mosquitoes, thereby increasing the spread of diseases and posing a direct risk to public health.
        </p>
        <ImageSection src= 'hardikimages/image 12.png' />
       
      </Section>

      <Section id= "p2i5" title="The Invisible Enemy: Microplastics and Industrial Leakages">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Not all plastic pollution starts as a visible bottle or bag. Primary microplastics, such as microbeads, are intentionally manufactured for use in facial scrubs, cleansers, and cosmetics. Because these particles are microscopic, they are too small to be captured by standard wastewater treatment plant filters. Consequently, they flow directly into rivers and eventually the ocean. 
        </p>
        <ImageSection src= 'hardikimages/image 13.png' />
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Similarly, the plastic industry contributes through industrial leakages. Tiny plastic pellets known as nurdles are the raw materials for nearly all plastic products. During transport or manufacturing, these pellets can accidentally spill into the environment. Nurdles are now found on beaches worldwide, where marine life easily mistakes them for fish eggs or other food sources.
        </p>
        <ImageSection src= 'hardikimages/image 17.png' />
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Secondary microplastics are formed through the fragmentation of larger items. Sunlight (UV radiation), physical wear and tear from waves, and chemical reactions cause large plastic debris to brittle and break apart. These particles are more dangerous than macro-plastics because they are nearly impossible to detect or remove from the environment once they have spread.
        </p>
        <ImageSection src= 'hardikimages/image 9.png' />
      </Section>

      <Section id= "p2i6" title="Rivers as Global Transport Highways">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Rivers serve as the primary arteries transporting plastic waste from inland areas to the marine environment. Research indicates that a small number of major river systems are responsible for a vast majority of the plastic entering the oceans. Rivers like the Yangtze (China), the Ganges (India and Bangladesh), and the Niger (Africa) act as high-speed conveyors for mismanaged waste.
        </p>       
        
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This transport is heavily influenced by coastal population density. In countries with large populations living near water systems, the "leakage" of waste is much higher. In these regions, rapid urbanization has often outpaced the development of formal waste collection and treatment infrastructure, making the river-to-sea pathway a critical priority for environmental intervention.
        </p>
        <ImageSection src= 'hardikimages/image 14.png' />
      </Section>

     

      <Section id= "p2i7" title="Marine Accumulation and the Great Pacific Garbage Patch">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Once plastic reaches the ocean, its fate is determined by its density. Some plastics float on the surface, while others sink to the seabed. Over time, surface plastics are caught in circular ocean currents known as gyres. The most famous result of this process is the Great Pacific Garbage Patch, a massive accumulation of floating debris consisting of fishing nets, bottles, and a "soup" of microplastics.
        </p>
        
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This accumulation is not just an aesthetic issue; it is a biological one. Marine organisms frequently mistake plastic for food. Through bioaccumulation, toxic chemicals associated with plastics (and those absorbed from the surrounding water) move up the food chain. When small organisms eat microplastics, and larger fish eat those organisms, the toxins become more concentrated. Eventually, these contaminants reach humans who consume seafood, creating a closed loop of environmental and health risks.
        </p>
        <ImageSection src= 'hardikimages/image 16.png' />
      </Section>

      <Section id= "p2i8" title="Conclusion: Breaking the Link Between Growth and Waste">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            There is an undeniable correlation between economic growth (GDP) and plastic waste generation. As nations develop, consumption rises, and the use of packaged goods increases. However, the environmental impact of this growth is not inevitable. The distinction lies in the quality of waste management infrastructure.
        </p>
        
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            While high-income countries generate the most plastic waste per capita, they often have the systems required to contain and recycle it. In contrast, developing nations—where consumption may be lower—frequently suffer from higher levels of environmental leakage due to a lack of formal collection systems.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The solution to the plastic crisis must be multi-faceted. It requires a transition from a linear economy to a circular economy, where plastic is designed for reuse and recycling from the outset. Locally, this means implementing rigorous source segregation and investing in infrastructure that prevents waste from entering our rivers. Globally, it requires a shift in how we value plastic—not as a disposable convenience, but as a persistent material that demands responsible stewardship from production to end-of-life. Protecting our oceans and our health depends on our ability to intercept the journey of plastic before it ever leaves the land.
        </p>
      </Section>

     

    </div>
  );
};

export default PageTwo;