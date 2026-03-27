import { Link, useParams, useNavigate } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { rtiDocumentMap } from "./rtiDocuments";

export default function RTIDocumentViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const document = rtiDocumentMap[slug];

  if (!document) {
    return (
      <SubpageTemplate
        title="RTI Document"
        breadcrumb={[{ name: "RTI", href: "/rti" }, { name: "Not found" }]}
      >
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] mb-2">
            Document not found
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            The requested RTI document is unavailable.
          </p>
          <Link to="/rti" className="text-sm font-semibold text-[#003366]">
            Back to RTI
          </Link>
        </div>
      </SubpageTemplate>
    );
  }

  const isPdf = document.url.toLowerCase().includes(".pdf");

  return (
    <SubpageTemplate
      title="RTI Document Viewer"
      breadcrumb={[{ name: "RTI", href: "/rti" }, { name: document.clause }]}
    >
      <div className="space-y-4">
        <button
          onClick={() => navigate("/rti")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors mb-2"
        >
          ← Back to RTI
        </button>
        <div className="bg-white rounded shadow-sm p-5 border border-gray-200">
          <h2 className="text-lg font-bold text-[#003366]">
            {document.clause}
          </h2>
          <p className="text-sm text-gray-700 mt-1">{document.desc}</p>
          <p className="text-xs text-gray-500 mt-3">
            This document is opened inside the JMC website view.
          </p>
        </div>

        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-600 uppercase">
              {isPdf ? "PDF Preview" : "Document Preview"}
            </span>
          </div>
          <iframe
            title={`${document.clause} preview`}
            src={document.url}
            className="w-full min-h-[75vh]"
          />
        </div>
      </div>
    </SubpageTemplate>
  );
}
