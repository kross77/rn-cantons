import React from "react";
import Content from './Content'
import Fade from './Fade'
import Wrapper from './Wrapper'



interface Skin {
     Content: React.ComponentType<Content>
     Fade: React.ComponentType<Fade>
     Wrapper: React.ComponentType<Wrapper>
}

const Skin: Skin = {
    Content,
    Fade,
    Wrapper,
}

export default Skin
