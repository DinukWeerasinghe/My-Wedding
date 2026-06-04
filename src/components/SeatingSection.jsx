import "./SeatingSection.css";

export function SeatingSection({ seatingQuery, setSeatingQuery, seatingResult, searchedName, onSearch, onClear }) {
  return (
    <section className="section seating-section" id="seating" aria-labelledby="seatingTitle">
      <div className="section-inner">
        <div className="seating-card reveal">
          <div className="seating-header">
            <span className="eyebrow">Wedding Seating</span>
            <h2 id="seatingTitle">Find Your Table</h2>
            <p>Enter your first or last name below to find your assigned seat and table details.</p>
          </div>

          <form className="seating-search-form" onSubmit={onSearch}>
            <div className="seating-input-wrap">
              <i data-lucide="search" className="seating-search-icon" aria-hidden="true"></i>
              <input
                type="text"
                className="seating-input"
                placeholder="Enter your name (e.g. Perera, Wijesiri)..."
                value={seatingQuery}
                onChange={(e) => setSeatingQuery(e.target.value)}
                aria-label="Guest seating search"
              />
              {seatingQuery && (
                <button type="button" className="seating-clear-btn" onClick={onClear} aria-label="Clear search">
                  <i data-lucide="x" aria-hidden="true"></i>
                </button>
              )}
            </div>
            <button className="premium-button" type="submit">
              Search Seating
            </button>
          </form>

          {/* Results dynamic panel */}
          {seatingResult && (
            <div className="seating-result-panel reveal is-visible">
              {seatingResult.notFound ? (
                <div className="seating-notfound">
                  <i data-lucide="search-code" className="result-icon notfound" aria-hidden="true"></i>
                  <h3>Name Not Found</h3>
                  <p>We couldn't find "<strong>{searchedName}</strong>" in our seating list. Please double-check spelling or ask our hospitality desk upon arrival.</p>
                </div>
              ) : (
                <div className="seating-found">
                  <i data-lucide="ticket" className="result-icon found" aria-hidden="true"></i>
                  <span className="result-welcome">Welcome, guest</span>
                  <h3>{seatingResult.name}</h3>
                  <div className="seating-table-badge">
                    <span className="table-num">Table {seatingResult.table}</span>
                    <span className="table-name">{seatingResult.tableName}</span>
                  </div>
                  <p>We are absolutely thrilled to welcome you to our celebration banquet!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
