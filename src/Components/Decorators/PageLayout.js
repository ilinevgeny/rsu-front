import React from 'react'

export default (LeftAside, PageComponent, RightAside) => class PageLayout extends React.Component {
    render() {
        return (
            <article className="main_wrap">
                <LeftAside/>
                <section className="content">
                    <PageComponent {...this.props} />
                </section>
                <RightAside/>
            </article>
        );
    }
}
