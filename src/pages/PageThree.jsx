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

const PageThree = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Plastic Waste Management Rules in India
      </h1>

      <Section id= "p3i1" title="Overview">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic waste has emerged as one of the most pressing environmental challenges of modern times. With the increasing use of plastic in everyday life, its improper disposal has led to severe consequences for ecosystems, human health, and global sustainability. Recognizing this growing concern, India introduced the Plastic Waste Management Rules in 2016, along with subsequent amendments to strengthen their implementation.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This section explores the evolution, importance, and key features of plastic waste management rules in India, along with their comparison to global practices.
        </p>

        <ImageSection src= 'week 3 and 4/page 1/1.webp' />
        
       
      </Section>

      <Section id= "p3i2" title="Evolution of Environmental Rules in India">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            India’s environmental regulatory framework has evolved significantly over the decades. The journey began in the 1960s when the Ministry of Agriculture introduced composting initiatives for solid waste. A major milestone came with the Environmental Protection Act of 1986, which laid the foundation for modern environmental governance.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Subsequent years saw the introduction of various specialized rules:
        </p>

        <ul>
            <li>Hazardous Waste Rules (1989) to manage industrial waste</li>
            <li>Biomedical Waste Rules (1998) for healthcare waste</li>
            <li>Municipal Solid Waste Rules (2000) for urban waste management</li>
            <li>E-Waste and Plastic Waste Rules (2011)</li>
        </ul>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A turning point occurred after the 1994 Surat plague, which highlighted the consequences of poor waste management and triggered nationwide reforms. Finally, in 2016, a comprehensive revision of all major waste management rules—including plastic waste—was introduced, marking a significant step forward.
        </p>

        <ImageSection src= 'week 3 and 4/page 2/2.png' />
        
      </Section>

      <Section id= "p3i3" title="Why Plastic Waste Management Rules Are Necessary">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic is a highly versatile material—durable, lightweight, and resistant to degradation. While these properties make it useful, they also make plastic waste extremely problematic. Unlike organic materials, plastic does not decompose easily; instead, it breaks down into smaller particles called microplastics, which persist in the environment for hundreds to thousands of years.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Large quantities of plastic waste end up in rivers, oceans, and soil, causing:
        </p>
        <ul>
            <li>Marine life ingestion and death</li>
            <li>Contamination of food chains</li>
            <li>Blockage of drainage systems</li>
            <li>Long-term ecological damage</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            For example, rivers like the Ganga contribute significantly to global plastic pollution, emphasizing the urgency of effective waste management policies.
        </p>

        <ImageSection src= 'week 3 and 4/page 3/3.jpg' />
      </Section>

      <Section id= "p3i4" title="Plastic Waste Management Rules, 2016">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The Plastic Waste Management Rules, 2016 replaced earlier regulations and introduced a more comprehensive and inclusive framework. Key highlights include:
        </p>

        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Expanded Scope
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Unlike earlier rules focused mainly on urban areas, the 2016 rules extended their reach to rural regions, including gram panchayats. This was crucial as plastic usage had significantly increased in villages as well.
        </p>

        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Increased Thickness of Plastic Bags
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The minimum thickness of plastic carry bags was raised from 40 microns to 50 microns, encouraging reuse and reducing littering.
        </p>

        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Responsibility of Waste Generators
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Individuals, institutions, and commercial establishments are now required to:
            <ul>
                <li>Segregate plastic waste at source</li>
                <li>Pay user fees for waste collection</li>
                <li>Avoid littering</li>
            </ul>
        </p>


        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Extended Producer Responsibility (EPR)
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Producers and brand owners are made responsible for managing the plastic waste generated from their products, ensuring accountability across the lifecycle.
        </p>


        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Inclusion of Retailers and Vendors
        </b>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Street vendors and shopkeepers must register with local authorities and comply with regulations for plastic usage.
        </p>

        

       
      </Section>

      <Section id= "p3i5" title="Challenges in Implementation'">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            While the rules are comprehensive and progressive, their implementation remains a major challenge. Some key issues include:
        </p>
        <ul>
            <li>Lack of infrastructure for collection and recycling</li>
            <li>Insufficient awareness among citizens and local bodies</li>
            <li>Limited capacity in rural areas to manage waste effectively</li>
            <li>Mismatch between policy and ground reality</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            For example, even when waste is segregated at the source, it is often mixed again during transportation due to inadequate systems.
        </p>

        <ImageSection src= 'week 3 and 4/page 5/5.jpeg' />
      </Section>

      <Section id= "p3i6" title="Understanding Plastic Waste Management Rules (Detailed Insights)">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The Plastic Waste Management Rules, 2016 represent a significant step forward in India’s environmental governance. These rules not only define how plastic waste should be handled but also establish responsibilities for various stakeholders including individuals, industries, local bodies, and government institutions.
        </p>       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The official rules were published in the Government Gazette on March 18, 2016, marking their formal implementation across the country. Building upon earlier regulations, these rules aim to create a structured and accountable system for managing plastic waste efficiently.
        </p>  

        <ImageSection src= 'week 3 and 4/page 6/6.webp' />     
        
      </Section>



      <Section id= "p3i7" title="Key Improvements in the 2016 Rules">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            One of the most important updates introduced in 2016 was the increase in the minimum thickness of plastic carry bags from 40 microns to 50 microns. This change was designed to make plastic bags more durable and reusable, thereby reducing their tendency to become litter.
        </p>       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            However, while thicker bags reduce immediate environmental damage, they do not eliminate the problem entirely. Plastic still persists in the environment, and its long-term impact remains a concern.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            From an engineering perspective, any solution must balance three critical factors:      
        </p>       
        <ul>
            <li>Functionality (Does it serve its purpose effectively?)</li>
            <li>Environmental impact (Is it sustainable?)</li>
            <li>Economic feasibility (Is it affordable and scalable?)</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A successful waste management system must optimize all three.
        </p>

        <ImageSection src= 'week 3 and 4/page 7/7.jpg' />
        
      </Section>



      <Section id= "p3i8" title="Extended Producer Responsibility (EPR)">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            A major highlight of the 2016 rules is the introduction of Extended Producer Responsibility (EPR). This concept shifts part of the responsibility for waste management onto producers and brand owners.
        </p>       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            In simple terms, companies that manufacture or sell products generating plastic waste must contribute to its proper disposal and recycling.
        </p>       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Instead of each company handling waste individually, a more efficient approach is to:
        </p>  
        <ul>
            <li>Pool financial resources from multiple companies</li>
            <li>Create centralized waste management systems</li>
            <li>Engage specialized waste management agencies</li>
        </ul>    
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This collaborative model has already been successfully implemented in countries like Canada and parts of Europe, especially for electronic waste.
        </p>

        <ImageSection src= 'week 3 and 4/page 8/8.jpg' />
        
      </Section>


      <Section id= "p3i9" title="Responsibility of Waste Generators">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Every individual, institution, and organization plays a role in generating plastic waste. The rules emphasize that waste generators must take responsibility for minimizing and managing their waste.
        </p>       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Key responsibilities include:
        </p>       
        <ul>
            <li>Minimizing plastic usage wherever possible</li>
            <li>Segregating plastic waste from other waste streams</li>
            <li>Avoiding littering in public or private spaces</li>
            <li>Handing over segregated waste to authorized collectors</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Additionally, event organizers are required to manage plastic waste generated during events, especially when food packaging or multi-layered plastics are involved. This ensures that large gatherings do not contribute to uncontrolled waste accumulation.
        </p>       
        
      </Section>


      <Section id= "p3i10" title="Roles and Responsibilities of Stakeholders">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The rules clearly assign responsibilities across different levels:
        </p>       
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The official rules were published in the Government Gazette on March 18, 2016, marking their formal implementation across the country. Building upon earlier regulations, these rules aim to create a structured and accountable system for managing plastic waste efficiently.
        </p>       
        
      </Section>



    </div>
  );
};

export default PageThree;