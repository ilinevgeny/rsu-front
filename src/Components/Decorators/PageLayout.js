import React from 'react'

export default (LeftAside, PageComponent, RightAside) => class PageLayout extends React.Component {
    render() {
        return (
            <article className="main_wrap">
                {LeftAside ? <LeftAside/> : ''}
                <PageComponent {...this.props} />
                {RightAside ? <RightAside/> : ''}
            </article>
        );
    }
}
