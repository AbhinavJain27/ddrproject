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

const PageOne = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Understanding Plastics & Plastic Waste
      </h1>

      <Section id="p1i1" title="What is Plastic?">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic is a synthetic or semi-synthetic organic material composed of high molecular mass compounds. Its unique ability to be molded into a wide range of shapes and sizes makes it one of the most versatile materials used in modern life. From the moment we wake up, plastic surrounds us—whether it is a toothbrush, toothpaste tube, water tap, or even plumbing systems within buildings. 
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            What makes plastic so widely used is its flexibility, durability, lightweight nature, and ease of manufacturing. It can be designed in countless forms, textures, and colors, allowing it to be used in everything from packaging and household items to construction and electronics. Additionally, plastics are primarily organic compounds, though they often include small amounts of inorganic materials to enhance strength, stability, and functionality. 
        </p>
        <ImageSection src= 'hardikimages/image1.png' />
      </Section>


      <Section id="p1i2" title="Key Characteristic">
        <p>
            Plastics have become so popular because of their unique properties:
        </p>

        <ul>
          <li>Plastics are highly resistant to chemicals and corrosion, making them suitable for harsh environments. They also act as excellent thermal and electrical insulators, which is why they are widely used in wiring and electronic devices. </li>

          <li>Another key advantage is their high strength-to-weight ratio, meaning they are strong yet lightweight. Plastics are also durable, water-resistant, and can be produced in a wide range of colors and forms. </li>

          <li>However, despite these benefits, improper disposal leads to environmental issues such as plastic entering oceans and affecting marine life and food chains.</li>
        </ul>

      </Section>

      <Section id="p1i3" title="Why Understanding Plastic Matters">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic has revolutionized modern life by offering convenience, affordability, and versatility. However, improper disposal and poor waste management have led to serious environmental challenges. Understanding what plastic is made of and how it is produced is the first step toward developing effective solutions for plastic waste management. 
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            By recognizing that plastic waste contains not only polymers but also various additives, we can design better recycling systems and move toward more sustainable alternatives.
        </p>
      </Section>

      <Section id="p1i4" title="History of Plastic">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The journey of plastic began in 1862, when Alexander Parkes introduced a material called Parkesine at an international exhibition in London. This was a semi-synthetic plastic derived from cellulose nitrate, which could be heated, molded, and retained its shape upon cooling. It marked the beginning of a new era in material science. 
        </p>
        <ImageSection src= 'hardikimages/IMAGE2.png' />
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Later, in 1907, Leo Baekeland developed the first fully synthetic plastic known as Bakelite. This material was revolutionary due to its properties such as heat resistance, electrical insulation, and durability, making it ideal for industrial and household applications.
        </p>
        <ImageSection src= 'hardikimages/IMAGE 3.png' />
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Over time, plastics evolved into the wide variety of materials we use today, becoming essential in almost every industry. However, with this growth came challenges, especially in managing plastic waste effectively.
        </p>
      </Section>

      <Section id="p1i5" title="How Plastic is Made">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic production is based on a process called polymerization, where small molecules known as monomers combine under heat, pressure, and catalysts to form long chains called polymers. For example, ethylene molecules are transformed into polyethylene, one of the most common plastics used worldwide. 
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            However, polymers alone are not enough. To achieve the desired properties, manufacturers add various substances known as additives. These additives enhance strength, flexibility, color, durability, and resistance to heat or fire. The final product is a carefully engineered material tailored for specific uses.
        </p>
        <ImageSection src= 'hardikimages/image 4.png' />
      </Section>

      <Section id="p1i6" title="Key Additives in Plastic">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastics are rarely pure polymers i.e, they contain several additives that define their performance and usability:
        </p>       
        <ul>
            <li><b>Fillers:</b> Added to improve strength, hardness, and durability. Common examples include calcium carbonate and silica. </li>
            <li><b>Plasticizers:</b> Increase flexibility and softness, allowing plastics to be molded into complex shapes.</li>
            <li><b>Stabilizers:</b> Protect plastic from degradation caused by heat, light, and environmental exposure, extending its lifespan. </li>
            <li><b>Colorants:</b> Dyes and pigments provide the wide range of colors seen in plastic products. </li>
            <li><b>Lubricants:</b> Help in manufacturing by preventing plastics from sticking to molds. </li>
            <li><b>Flame Retardants:</b> Reduce the risk of fire by preventing flame spread, commonly used in electronics and appliances. </li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            These components make plastics highly customizable, but they also complicate recycling and waste management processes.
        </p>
      </Section>

      <Section id="p1i7" title="Major Plastic Manufacturing Processes">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic products are created using several manufacturing techniques. Each method produces materials with different shapes, strengths, and applications.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Extrusion</b> is one of the most widely used methods where plastic granules are melted and pushed through a die to create continuous shapes like pipes, sheets, and films. This method is efficient but typically limited to products with uniform cross-sections. 
        </p>
        <YouTube
            videoId="ETz2WiX6tMI"
            opts={{
            width: "100%",
            height: "400",
            }}
        />

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Injection</b> molding involves melting plastic and injecting it into molds to produce complex shapes such as containers, electronic parts, and household items. It is highly versatile but requires high initial setup costs. 
        </p>
        <YouTube
            videoId="b1U9W4iNDiQ"
            opts={{
            width: "100%",
            height: "400",
            }}
        />


        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Blow molding</b> is mainly used for producing hollow objects like bottles. In this process, heated plastic is expanded using air pressure inside a mold to achieve the desired shape. 
        </p>
        <YouTube
            videoId="NE4c1gwzPb4"
            opts={{
            width: "100%",
            height: "400",
            }}
        />


        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Thermoforming</b> uses heat and vacuum to shape plastic sheets into products like trays, cups, and packaging materials. 
        </p>
        <YouTube
            videoId="HzyP7JsCbFc"
            opts={{
            width: "100%",
            height: "400",
            }}
        />

        <b style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Each of these processes contributes to the wide variety of plastic products we see in everyday life.
            Beyond the primary methods, several additional techniques are used to manufacture plastics:
        </b>


        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Calendaring</b> produces plastic sheets by passing material through rollers, commonly used for films and coatings. 
        </p>
        <YouTube
            videoId="xBM78Yx9b-I"
            opts={{
            width: "100%",
            height: "400",
            }}
        />

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Film blowing</b> creates thin plastic films by expanding molten plastic into bubble-like structures, often used for packaging. 
        </p>
        <YouTube
            videoId="alekgxrXRf8"
            opts={{
            width: "100%",
            height: "400",
            }}
        />


        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Rotational molding</b> is used for hollow items like water tanks and containers by rotating heated molds to evenly distribute material.  
        </p>
        <YouTube
            videoId="iVq4pQmb2lM"
            opts={{
            width: "100%",
            height: "400",
            }}
        />


        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Compression molding</b> shapes plastic by applying heat and pressure inside a mold, suitable for detailed components.
        </p>
        <YouTube
            videoId="p3MhARSN0OU"
            opts={{
            width: "100%",
            height: "400",
            }}
        />


        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Casting</b> involves pouring liquid plastic into molds and allowing it to solidify, often used for thicker products with smooth finishes. 
        </p>
        <YouTube
            videoId="_EsNJWtavGY"
            opts={{
            width: "100%",
            height: "400",
            }}
        />

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Each method has its own advantages and limitations, influencing cost, efficiency, and product quality. 
        </p>

      </Section>

      <Section id="p1i8" title="Classification of Plastics">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            In this section, we deepen our understanding of plastics by exploring their classification based on behavior, structure, properties, and resin types. This knowledge is essential because different plastics behave differently during recycling, reuse, and disposal, making classification a key step in effective plastic waste management. 
        </p>
        <h5>
            Plastic Resin Codes (1–7)
        </h5>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastics are also identified using resin identification codes, which indicate their type and recyclability:
        </p>
        <ul>
            <li>PET (Polyethylene Terephthalate) is commonly used for beverage bottles due to its strength, clarity, and moisture resistance. It is one of the most recyclable plastics. </li>
            <li>HDPE (High-Density Polyethylene) is strong, durable, and resistant to heat, making it ideal for containers like milk bottles, detergent bottles, and drums. </li>
            <li>PVC (Polyvinyl Chloride) is widely used in pipes, cables, and construction materials but is difficult to recycle and can release harmful substances if not managed properly. </li>
            <li>LDPE (Low-Density Polyethylene) is used in plastic bags and packaging films and forms a large portion of household plastic waste. </li>
            <li>Polypropylene (PP) is used in food containers, medical equipment, and household items due to its strength and chemical resistance. </li>
            <li>Polystyrene (PS) is used in disposable cups, plates, and packaging foam but poses serious environmental concerns due to poor recyclability. </li>
            <li>Others: Includes polycarbonate, nylon, and mixed plastics</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Generally, plastics with lower numbers (like PET and HDPE) are easier to recycle, while higher numbers are more complex and less economically viable to process. 
        </p>
        <h5>
            Thermoplastics vs Thermosetting Plastics
        </h5>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastics can be broadly divided based on how they respond to heat:
        </p>
        <ul>
            <li>Thermoplastics soften when heated and harden upon cooling. This process can be repeated multiple times, making them highly recyclable and suitable for reshaping into new products. These plastics are widely used because of their flexibility, ease of processing, and recyclability. </li>
            <li>On the other hand, thermosetting plastics undergo an irreversible chemical change when heated. Once molded, they cannot be reshaped or remelted. While they are more resistant to heat and suitable for engineering applications, they are difficult to recycle and often used in waste-to-energy processes instead.</li>
            <li>Examples of thermoplastics include polyethylene, polypropylene, and polystyrene, while thermosetting plastics include epoxy, polyurethane, and phenolic materials. </li>
        </ul>
        


        <h5 style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Homogeneous vs Heterogeneous Plastics
        </h5>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastics can also be classified based on their internal structure:
        </p>
        <ul>
            <li>Homogeneous plastics are made primarily of hydrocarbon chains and have a uniform structure. Examples include polyethylene, polypropylene, and polystyrene. </li>
            <li>Heterogeneous plastics contain additional elements such as oxygen, nitrogen, or chlorine in their structure. These plastics are more complex and include materials like PVC, nylon, and ABS. </li>
            <li>This structural difference affects properties like strength, flexibility, and recyclability.</li>
        </ul>


        <h5 style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Physical Types of Plastics
        </h5>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Based on physical and mechanical properties, plastics can be categorized into four main types:
        </p>
        <ul>
            <li>Rigid plastics have high strength and retain their shape under stress. Examples include HDPE containers and PET bottles. </li>
            <li>Semi-rigid plastics offer moderate flexibility and can deform under pressure but return to their original shape once the force is removed.  </li>
            <li>Soft plastics are highly flexible and slowly regain their shape after deformation. These are commonly used in toys and packaging. </li>
            <li>Elastomers are extremely elastic materials that can stretch significantly and return to their original form, similar to rubber bands. </li>
        </ul>

        <ImageSection src= 'hardikimages/image 5.png' />

      </Section>




      <Section id="p1i9" title="Uses of Plastics">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            After understanding what plastics are and how they are classified, the next step is to explore where plastics are used and why they are so dominant globally. Plastics are not limited to one sector—they are deeply integrated into almost every industry and aspect of daily life. 
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Major sectors where plastics are extensively used include automotive, electrical and electronics, consumer goods, medical devices, construction, packaging, industrial machinery, and optical media. Among these, packaging and consumer goods account for a significant portion due to their everyday demand. 
        </p>

        <h5>Plastic in the Automotive Industry</h5>
        <ul>
            <li>Modern vehicles rely heavily on plastics. From bumpers and dashboards to door panels, mirrors, and engine components, plastic is used throughout a car—from front to back. </li>
            <li>The primary reason for this is that plastics are lightweight yet strong, which reduces the overall weight of vehicles. This leads to better fuel efficiency and reduced energy consumption, making vehicles more environmentally efficient in terms of fuel usage. </li>
            <li>Thus, plastics play a positive role in improving transportation systems, even though their waste needs proper management.</li>
        </ul>

        <ImageSection src= 'hardikimages/Image 19.png' />


        <h5>Industrial Applications of Plastics</h5>
        <ul>
            <li>In industrial settings, plastics are used in machinery, tools, pipes, insulation materials, and structural components. Their durability, corrosion resistance, and ease of manufacturing make them ideal for heavy-duty applications. </li>
            <li>Industries benefit from plastics because they are cost-effective, easy to shape, and require less maintenance compared to traditional materials like metals.</li>
        </ul>

        <ImageSection src= 'hardikimages/Image 20.png' />

        <h5>Plastics in Medical Applications</h5>
        <ul>
            <li>The medical field is one of the most critical areas where plastics are indispensable. Plastics are used in syringes, IV tubes, blood bags, gloves, medical packaging, and diagnostic equipment.</li>
            <li>Their advantages include sterility, lightweight nature, flexibility, and cost-effectiveness, which make healthcare safer and more accessible. Without plastics, many modern medical treatments would become significantly more expensive or impractical. </li>
        </ul>

        <ImageSection src= 'hardikimages/Image 21.png' />


        <h5>Plastics in Construction</h5>
        <ul>
            <li>In construction, plastics are widely used in pipes, plumbing systems, insulation, window frames, flooring, and wiring. </li>
            <li>Plastic materials are preferred because they are durable, resistant to water and corrosion, and easy to install, making them ideal for long-term infrastructure applications.</li>
        </ul>

        <ImageSection src= 'hardikimages/Image 22.png' />

        <h5>Plastics in Electrical & Electronic Applications</h5>
        <ul>
            <li>Every electronic device you use—whether a mobile phone, laptop, television, or appliance—contains plastic components. Plastics are used for insulation, outer casings, connectors, and internal parts.  </li>
            <li>Their role as excellent electrical insulators and their lightweight nature have enabled the development of compact and portable electronic devices.</li>
        </ul>

        <ImageSection src= 'hardikimages/Image 23.png' />

        <h5>Plastics in Consumer Goods & Packaging</h5>
        <ul>
            <li>Plastics dominate the consumer goods and packaging sectors. Everyday items such as toothbrushes, containers, bottles, toys, cleaning products, and food packaging are made from plastic. </li>
            <li>Packaging, in particular, is one of the largest users of plastic because it provides protection, durability, and convenience for transporting goods. However, this also contributes significantly to plastic waste, especially single-use plastics.</li>
        </ul>

        <ImageSection src= 'hardikimages/image 24.png' />

        <h5>Optical Media & Specialized Uses</h5>
        <ul>
            <li>Plastics are also used in optical media and communication devices, including CDs, USB drives, cables, and speakers. Their ability to be molded precisely makes them suitable for high-performance and specialized applications.  </li>
        </ul>
        <ImageSection src= 'hardikimages/Image 25.png' />

      </Section>

      <Section  id= "p1i10" title="Per Capita Plastic Waste Generation">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            When plastic waste is measured per person:
        </p>
        <ul>
            <li>Developed countries like the United States and Europe show higher per capita waste generation</li>
            <li>Developing countries show lower per capita values but higher mismanaged waste rates</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This shows that lifestyle and consumption patterns strongly influence plastic waste generation. 
        </p>
      </Section>

      <Section id= "p1i11" title="Plastic Waste Generation vs Pollution">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            An important distinction must be made between:
        </p>
        <ul>
            <li>Plastic waste generation</li>
            <li>Plastic pollution (mismanaged waste)</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Developed countries often produce more plastic waste per person but have efficient waste management systems, reducing environmental leakage.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            In contrast, developing regions may produce less plastic but contribute more to pollution due to poor waste management infrastructure.
        </p>
      </Section>

      <Section id= "p1i12" title="Plastic Waste Consumption vs Pollution">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            One important observation is that high plastic consumption does not always mean higher pollution. Developed countries often have better waste management systems, ensuring proper collection, recycling, and disposal.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            In contrast, many developing regions face challenges in waste management, leading to higher levels of mismanaged plastic waste entering the environment, including rivers and oceans. 
        </p>

      </Section>

      <Section id= "p1i13" title="Environmental Insight">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic pollution is not just about waste—it directly impacts ecosystems and human health. When plastics break down into microplastics, they enter the food chain through water, fish, and even everyday items like salt. This makes proper plastic management more critical than ever.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Understanding the types and properties of plastics helps in designing better recycling systems, reducing environmental damage, and moving toward sustainable solutions.
        </p>
      </Section>

      <Section id= "p1i14" title="Plastic vs Plastic Waste">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic itself is not inherently harmful—it has improved efficiency, reduced costs, and enhanced quality of life across industries. The real issue lies in the mismanagement of plastic waste, especially single-use plastics. 
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Effective solutions should focus on:
        </p>
        <ul>
            <li>Proper waste management</li>
            <li>Recycling and segregation</li>
            <li>Reducing single-use plastics</li>
            <li>Developing sustainable alternatives</li>
        </ul>
      </Section>


      <Section id= "p1i15" title="Why Plastic Pollution is Rising">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Plastic pollution is increasing due to several factors:
        </p>
        <ul>
            <li>Rapid growth in plastic production</li>
            <li>Heavy reliance on single-use plastics</li>
            <li>Lack of proper waste management systems</li>
            <li>Import/export of plastic waste between countries</li>
            <li>Low recycling rates for certain plastic types</li>
        </ul>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            This highlights that the issue is not plastic itself, but how we manage plastic after use.
        </p>
      </Section>

    </div>
  );
};

export default PageOne;