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

const PageFour = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Role of Government (Politics) in Plastic Waste Management On a Global Level
      </h1>

      <Section id= "p4i1" title="The Transition to Political Relevance">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            For decades, plastics enjoyed an unambiguously positive public image as versatile, sanitary, and superior materials. This led to a massive production boom, growing from 1.5 million tons in 1950 to 367 million tons by 2020.However, the political crisis began when it became clear that waste management infrastructure was lagging far behind production growth—a phenomenon known as "asymmetric development". Today, the political role is no longer just about collection; it is about managing the environmental "toxic legacy" of the billions of tons of plastic produced since the mid-20th century. Governments now intervene to prevent "leakage" into the environment, recognizing that once plastics enter waterways or become microplastics, recovery is virtually impossible
        </p>

        <ImageSection src= 'politics/page1/page 1.png' />
       
      </Section>

      <Section id= "p4i2" title="The Circular Economy and the Waste Hierarchy">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A major political trend is the transition from a "linear" economy (make, use, dispose) to a "circular economy". The core political objective here is to decouple economic growth from the depletion of natural resources. To guide this, policymakers use the Waste Hierarchy, a legal framework enshrined in directives like the EU Waste Framework Directive (2008/98/EC). This hierarchy dictates a strict order of preference for waste management:
        </p>
        

        <ul>
            <li><b>Prevention:</b> The most preferred option, involving measures taken before a product becomes waste to reduce quantity and toxicity.</li>
            <li><b>Reuse:</b> Utilizing products again for their original purpose without pre-processing.</li>
            <li><b>Recycling and Recovery:</b> Reprocessing waste into new products or energy.</li>
            <li><b>Disposal:</b> The last resort (landfilling), which politicians aim to phase out through restrictive legislation.</li>
        </ul>

        <ImageSection src= 'politics/page 2/Page 2.png' />
        
      </Section>

      <Section id= "p4i3" title=" Landfill Restrictions as a Political Lever">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            One of the most powerful tools a government can use to induce recycling is the restriction of landfills. There is a clear political correlation: as landfilling is restricted through bans or high taxes, recycling and energy recovery rates inevitably rise. Pioneers like Germany, Austria, and the Netherlands implemented landfill restrictions in the 1990s, effectively forcing the market to develop alternative recovery infrastructures. Because landfilling is often the cheapest option in the short term, politicians must intervene to shift the "cost benchmark" so that recycling becomes economically attractive.
        </p>

        <ImageSection src= 'politics/page 3/page 3s.png' />

      </Section>

      <Section id= "p4i4" title="Financing Waste: Extended Producer Responsibility (EPR)">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Politicians are increasingly moving away from taxpayer-funded waste management toward Extended Producer Responsibility (EPR). Under EPR, the financial and organizational burden of managing a product's end-of-life is shifted from the public sector to the private producers. This is an implementation of the "polluter-pays principle," where the "polluter" is redefined as the manufacturer who has the power to change a product’s design. By making producers pay for the collection and treatment of their packaging, governments create a direct incentive for Eco-design—designing products that are more durable, repairable, and recyclable.
        </p>

        <ImageSection src= 'politics/page 4/page 4.png' />
       
      </Section>

      <Section id= "p4i5" title="Global Diplomacy and the 'National Sword'">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic waste management is also a matter of international trade and geopolitical tension. Historically, high-income nations exported low-quality waste to lower-income countries, which often resulted in illegal littering and environmental damage. The political landscape changed forever in 2017 when China introduced the "National Sword" initiative, banning the import of several types of plastic waste. This political decision forced exporting nations (like the US and Germany) to urgently invest in domestic recycling infrastructure, as they could no longer rely on other countries to manage their waste.
        </p>

        <ImageSection src= 'politics/page 5/page 5.png' />
      </Section>

      <Section id= "p4i6" title="Regional Legislative Deep Dives">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Governments take different paths depending on their economic structure and history:
        </p>       
        
        <ul>
            <li><b>The European Union:</b> Leads with the EU Green Deal, aiming for a climate-neutral circular economy by 2050. It mandates that all plastic packaging be reusable or recyclable by 2030.</li>
            <li><b>Germany:</b> A pioneer that introduced its first Waste Disposal Act in 1972 to mitigate uncontrolled dumping. It has a strong track record of using EPR schemes (like the 1991 Packaging Ordinance) to shift responsibility to the private sector.</li>
            <li><b>The United States:</b> Lacks a single national recycling law, leaving much of the legislation to individual states. However, federal bills like the Save Our Seas Act 2.0 focus on improving domestic infrastructure and global engagement to prevent marine debris.</li>
            <li><b>China:</b> Has shifted from being the world's "dumping ground" to a leader in the circular economy. Its 2009 Circular Economy Promotion Law and 2020 Solid Waste Law emphasize reducing resource use and promoting domestic recycling over imports</li>
        </ul>

        <ImageSection src= 'politics/page 6/page 6.png' />
      </Section>

     

     

    </div>
  );
};

export default PageFour;