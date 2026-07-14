import { Container } from 'react-bootstrap'

function DestinationCardSkeleton({ className = '' }) {
  return (
    <article className={`destination-standard-card card-skeleton destination-card-skeleton ${className}`.trim()} aria-busy="true">
      <div className="destination-image-link card-skeleton-media" />
      <div>
        <span className="card-skeleton-line card-skeleton-line-lg" />
        <span className="card-skeleton-line card-skeleton-line-sm" />
        <span className="card-skeleton-link" />
      </div>
    </article>
  )
}

function ThemeCardSkeleton({ className = '' }) {
  return (
    <article className={`theme-standard-card card-skeleton theme-card-skeleton ${className}`.trim()} aria-busy="true">
      <div className="theme-image-link card-skeleton-media" />
      <div>
        <span className="card-skeleton-line card-skeleton-line-lg" />
        <span className="card-skeleton-line card-skeleton-line-sm" />
        <span className="card-skeleton-link" />
      </div>
    </article>
  )
}

function PackageCardSkeleton({ className = '' }) {
  return (
    <article className={`package-card h-100 package-card-skeleton card-skeleton ${className}`.trim()} aria-busy="true">
      <div className="card-image-wrap card-skeleton-media" />
      <div className="package-card-skeleton-body">
        <div className="card-skeleton-line card-skeleton-line-xs" />
        <div className="card-skeleton-line card-skeleton-line-lg" />
        <div className="card-skeleton-line card-skeleton-line-md" />
        <div className="card-skeleton-line card-skeleton-line-md" />
        <div className="card-skeleton-line card-skeleton-line-lg card-skeleton-line-short" />
      </div>
      <div className="package-card-skeleton-footer">
        <div className="card-skeleton-line card-skeleton-line-sm" />
        <div className="card-skeleton-link" />
      </div>
    </article>
  )
}

function GroupTripCardSkeleton({ className = '' }) {
  return (
    <article className={`group-trip-card group-trip-card-skeleton card-skeleton ${className}`.trim()} aria-busy="true">
      <div className="card-skeleton-media group-trip-skeleton-media" />
      <div>
        <span className="card-skeleton-line card-skeleton-line-xs" />
        <h3><span className="card-skeleton-line card-skeleton-line-lg" /></h3>
        <span className="card-skeleton-link" />
      </div>
    </article>
  )
}

function StoryCardSkeleton({ className = '' }) {
  return (
    <article className={`story-review-card story-review-card-skeleton card-skeleton ${className}`.trim()} aria-busy="true">
      <div className="story-review-head">
        <span className="story-review-avatar card-skeleton-media" />
        <div className="story-review-meta">
          <strong className="card-skeleton-line card-skeleton-line-lg" />
          <span className="card-skeleton-line card-skeleton-line-sm" />
        </div>
        <span className="story-review-open card-skeleton-link" />
      </div>
      <p className="story-review-text">
        <span className="card-skeleton-line card-skeleton-line-lg" />
        <span className="card-skeleton-line card-skeleton-line-md" />
        <span className="card-skeleton-line card-skeleton-line-sm" />
      </p>
      <div className="story-review-destination story-review-destination-skeleton">
        <span className="card-skeleton-media" />
        <div>
          <strong className="card-skeleton-line card-skeleton-line-md" />
          <span className="card-skeleton-line card-skeleton-line-xs" />
        </div>
        <span className="card-skeleton-link" />
      </div>
    </article>
  )
}

function StatSkeleton() {
  return (
    <div className="why-premium-stat stat-skeleton card-skeleton" aria-busy="true">
      <span className="stat-skeleton-icon" />
      <strong className="card-skeleton-line card-skeleton-line-md" />
      <small className="card-skeleton-line card-skeleton-line-sm" />
    </div>
  )
}

function CommunityImageSkeleton() {
  return (
    <div className="community-photo-skeleton card-skeleton" aria-busy="true">
      <span className="card-skeleton-media" />
    </div>
  )
}

function MiniDestinationCardSkeleton({ className = '' }) {
  return (
    <article className={`mini-destination-card card-skeleton ${className}`.trim()} aria-busy="true">
      <span className="card-skeleton-media" />
      <div>
        <span className="card-skeleton-line card-skeleton-line-lg" />
        <span className="card-skeleton-line card-skeleton-line-sm" />
        <span className="card-skeleton-link" />
      </div>
    </article>
  )
}

function PackageDetailSkeleton() {
  return (
    <section className="page-section text-center">
      <Container>
        <div className="package-detail-skeleton-wrap">
          <div className="package-detail-skeleton-hero card-skeleton" aria-busy="true">
            <div className="package-detail-skeleton-copy">
              <span className="card-skeleton-line card-skeleton-line-md" />
              <span className="card-skeleton-line card-skeleton-line-lg" />
              <span className="card-skeleton-line card-skeleton-line-sm" />
            </div>
          </div>
          <div className="package-detail-skeleton-grid">
            <div className="card-skeleton-line card-skeleton-line-lg" />
            <div className="card-skeleton-line card-skeleton-line-md" />
            <div className="card-skeleton-line card-skeleton-line-sm" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export {
  CommunityImageSkeleton,
  DestinationCardSkeleton,
  GroupTripCardSkeleton,
  MiniDestinationCardSkeleton,
  PackageCardSkeleton,
  PackageDetailSkeleton,
  StatSkeleton,
  StoryCardSkeleton,
  ThemeCardSkeleton,
}
