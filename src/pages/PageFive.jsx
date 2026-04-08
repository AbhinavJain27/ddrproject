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

const PageFive = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Recent Advancements In Plastic Waste Management
      </h1>

      <Section id= "p5i1" title="The Evolution of Intelligent Sorting and System Logistics">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The integration of Artificial Intelligence (AI) has transformed plastic waste sorting from a manual, error-prone process into a high-precision industrial operation. Modern Material Recovery Facilities (MRFs) now employ AI-driven image recognition combined with hyperspectral imaging to distinguish plastics by polymer type, color, and even the presence of specific additives or hazardous dyes. These deep learning models, when trained on diverse spectral datasets, can achieve classification accuracies exceeding 90–98%. Beyond simple identification, AI acts as a "cross-cutting enabler" that optimizes the entire value chain through:
        </p>
        <ImageBar images={["Recent/Page 1/image1.png", "Recent/Page 1/image2.png"]} />
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          <b>Fuzzy Logic Modeling:</b> This specialized AI framework is highlighted for its robustness in managing "nonlinear" and data-scarce waste systems, allowing for better decision-making when waste streams are highly variable or unpredictable.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          <b>Predictive Logistics:</b> By merging IoT sensor data with machine learning, municipalities can forecast waste generation patterns and dynamically adjust collection schedules. This reduces operational costs and prevents environmental leakage caused by bin overflows.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
          <b>Robotic High-Speed Sorting:</b>  AI-controlled robotic arms can perform waste separation at speeds and consistencies far beyond human capability, reducing labor intensity while improving the purity of the resulting recyclates.
        </p>

        <ImageBar images={["Recent/PAge 2/image1kavya.jpg"]} />
       
      </Section>

      <Section id= "p5i2" title="Biotechnological Advancements in Polymer Degradation">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Biological degradation is emerging as a sophisticated pretreatment and specialized recycling pathway, particularly for polymers with hydrolysable bonds like PET. The process typically begins with microbial colonization, where organisms form a biofilm on the plastic surface to establish intimate contact with the polymer matrix. These microbes secrete extracellular enzymes—such as hydrolases, cutinases, and lipases—to break down complex polymers into short-chain oligomers and monomers that the cells can then absorb and mineralize into CO2 and water.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Recent breakthroughs have focused on "tuning" these biological systems. Researchers are using AI-assisted protein engineering (including tools like AlphaFold) to design mutations that enhance the thermostability and catalytic activity of enzymes. Engineered enzymatic systems have demonstrated 20–60% improvements in degradation performance compared to conventional baselines. However, a core "conceptual tension" remains: circular economy strategies prioritize polymer stability for reuse, while biodegradation focuses on the irreversible loss of material value. Consequently, biodegradation is best positioned as a complementary pathway for managing contaminated or niche plastic streams that fall outside the reach of mechanical recycling.
        </p>

        <ImageBar images={["Recent/Page 3/p3i1.png", "Recent/Page 3/p3i2.png"]} />
        

      </Section>

      <Section id= "p5i3" title="Hybrid Thermochemical Valorization">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            For heterogeneous or highly contaminated plastic waste that cannot be mechanically recycled, thermochemical routes—such as pyrolysis, gasification, and hydrothermal liquefaction (HTL)—provide scalable recovery options. These processes use heat and chemical catalysts to depolymerize plastics into fuels, syngas (CO+H2 ), or industrial feedstocks.
        </p>

        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Catalytic Pyrolysis:</b> By introducing catalysts like acidic zeolites (ZSM-5 or USY), operators can lower reaction temperatures and suppress the formation of heavy tars, steering the output toward high-value aromatic hydrocarbons.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Hydrothermal Liquefaction (HTL):</b> Operating in subcritical or supercritical water, HTL is uniquely suited for processing "wet" feedstocks or mixed plastic-organic waste without the need for intensive drying.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Detoxification of Dye-Waste:</b> Advanced hybrid systems are being developed to handle plastics containing toxic synthetic dyes (like azo or anthraquinone classes). These systems use transition metal oxides (Fe2O3 or CuO) to oxidatively cleave dye bonds while simultaneously recovering energy from the polymer.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            While robust, these routes are energy-intensive and are categorized as "residual options" within the waste hierarchy, as they do not facilitate true closed-loop material recycling in the same way mechanical or chemical depolymerization does.
        </p>

        <ImageBar images={["Recent/Page 4/p4i1.png", "Recent/Page 4/p4i2.png", "Recent/Page 4/p4i3.png"]} />
      </Section>

      <Section id= "p5i4" title="Circular Economy Governance and Economic Feasibility ">
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            The transition to a circular plastics economy requires a fundamental decoupling of economic growth from virgin resource consumption. This is being operationalized through Extended Producer Responsibility (EPR) legislation, which shifts the financial and physical accountability for end-of-life management back to the manufacturers. Such policies incentivize "circular design"—reducing material complexity and eliminating hazardous additives at the start of a product's life.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            Economically, the scalability of these advancements depends on unit economics. Currently, the low cost of virgin plastics (often supported by fossil fuel subsidies) remains a major barrier to recycling investment. However, the paper identifies emerging business models that prove viability:
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Chemical Recycling Hubs:</b> Companies like Agilyx and Brightmark are scaling pyrolysis to reintroduce recovered carbon into the plastic value chain.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Enzymatic Platforms:</b> Carbios has demonstrated an industrial-scale enzymatic PET recycling technology that allows for "virgin-quality" monomer recovery.
        </p>
        <p style={{ lineHeight: "1.7", color: "#444", textAlign: "justify" }}>
            <b>Closed-Loop Logistics</b>: Reusable packaging systems (e.g., Loop) are reducing dependence on single-use plastics through durable containers and "take-back" infrastructures.
        </p>


        <ImageBar images={["Recent/Page 5/fig 1.png", "Recent/Page 5/fig 2.jpg", "Recent/Page 5/fig 3.png"]} />

        
       
      </Section>


    </div>
  );
};

export default PageFive;