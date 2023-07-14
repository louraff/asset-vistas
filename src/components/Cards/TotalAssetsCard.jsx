import "../css/Cards.css"

export default function TotalAssetsCard({ numAssets }) {
    return (
      <div className="asset-card total">
        <h2 className="asset-card">Total Number of Assets</h2>
        <h2 className="asset-card">{numAssets}</h2>
      </div>
    );
  }