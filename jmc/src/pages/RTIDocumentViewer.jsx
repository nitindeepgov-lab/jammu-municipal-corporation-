import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getRtiDocumentBySlug } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";

export default function RTIDocumentViewer() {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const strapiBaseUrl = STRAPI_URL;

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setError(null);

    getRtiDocumentBySlug(slug)
      .then((res) => {
        const item = res?.data?.data?.[0];
        if (!item) {
          setNotFound(true);
          setDocument(null);
          return;
        }

        const attr = item.attributes || item;
        const media = attr.document?.data?.attributes || attr.document || {};
        const rawUrl = media?.url || attr.document?.data?.url || "";
        const documentUrl = rawUrl
          ? rawUrl.startsWith("http")
            ? rawUrl
            : `${strapiBaseUrl}${rawUrl}`
          : "";

        setDocument({
          clause: attr.clause,
          particulars: attr.particulars,
          documentUrl,
        });
      })
      .catch((err) => {
        console.error("Failed to load RTI document:", err);
        setError("Unable to load this RTI document right now.");
      })
      .finally(() => setLoading(false));
  }, [slug, strapiBaseUrl]);

  if (loading) {
    return (
      <SubpageTemplate
        title="RTI Document"
        breadcrumb={[{ name: "RTI", href: "/rti" }, { name: "Loading" }]}
      >
        <div className="bg-white rounded shadow-sm p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2 py-12">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-[#003366] rounded-full animate-spin" />
            <span className="text-xs text-gray-500 font-semibold">
              Loading document...
            </span>
          </div>
        </div>
      </SubpageTemplate>
    );
  }

  if (error) {
    return (
      <SubpageTemplate
        title="RTI Document"
        breadcrumb={[{ name: "RTI", href: "/rti" }, { name: "Error" }]}
      >
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] mb-2">
            Unable to load document
          </h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <Link to="/rti" className="text-sm font-semibold text-[#003366]">
            Back to RTI
          </Link>
        </div>
      </SubpageTemplate>
    );
  }

  if (notFound || !document) {
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

  const isPdf = document.documentUrl.toLowerCase().includes(".pdf");

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
          <p className="text-sm text-gray-700 mt-1">{document.particulars}</p>
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
            src={document.documentUrl}
            className="w-full min-h-[75vh]"
          />
        </div>
      </div>
    </SubpageTemplate>
  );
}
