import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'

import { ExternalLink, Link as StyledLink, Page, PageHeading } from '@gnomad/ui'

import DocumentTitle from './DocumentTitle'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    const { children, location } = this.props
    const { hasError } = this.state

    if (hasError) {
      const issueURL = `https://github.com/broadinstitute/exome-results-browsers/issues/new?title=${encodeURIComponent(
        `Render error on ${location.pathname}${location.search}`
      )}`

      return (
        <Page>
          <DocumentTitle title="Error" />
          <PageHeading>Something Went Wrong</PageHeading>
          <p>An error occurred while rendering this page.</p>
          <p>
            This is a bug. Please{' '}
            <ExternalLink href={issueURL}>file an issue on GitHub</ExternalLink> and{' '}
            <StyledLink href="/">reload the browser</StyledLink>.
          </p>
        </Page>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default withRouter(ErrorBoundary)
