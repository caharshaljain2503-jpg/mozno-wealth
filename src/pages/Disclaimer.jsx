import React from "react";

const Disclaimer = () => {
  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-700 leading-relaxed">
            The information on this website is for general informational purposes only and should
            not be treated as investment, legal, or tax advice for your specific situation.
            Investment products are subject to market risk, and past performance does not guarantee
            future results. Please consult a qualified advisor before acting on any information.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            AMFI Registered Mutual Fund Distributor (ARN-338534) and APMI Registered Distributor
            (APRN08037) disclosures apply where relevant.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
