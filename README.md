# Proof Of Concept (POC)

# Deploy a REACT App in a Tomcat using the Pokedex DEMO

## Environment

- Apache Tomcat (At the moment of writing this I used the version: 9.0.30).
- NPM & NODE (I used node v9.9.0, npm 6.13.7) with create-react-app installed.
- Apache Maven (v3.6.2).

## Assumptions

- You have already working & running REACT project at (for example) .
- To have knowledge on building REACT and also MAVEN based apps.

# Instructions

We're using BrowserRouter from the react-router-dom (TypeScript 3.7), so you can use it to avoid 404 error because of relative/absolute paths:

(Following the example of the Pokedex)

### 
```
import React, { PureComponent } from 'react'
import {
  BrowserRouter
} from 'react-router-dom';
import ga from '../../utils/ga'

class Pokemon extends PureComponent {
  render() {
    const { pokemon } = this.props

    return (
      <div className="pokemon">
        <button
          type="button"
          className="pokemon__sprite"
          onClick={() => {
            ga.event({
              category: 'pokemon',
              action: 'click',
              label: pokemon.id
            })
          }}
          style={{
            backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`})`
          }}
        />
        <p className="pokemon__name">{pokemon.name}</p>
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        </BrowserRouter>
      </div>
    )
  }
}

export default Pokemon
```

We're going to package the entire app into a war file using MAVEN, the pom and is going to use be used to inject paths using the BrowserRouter. In order to package the solution into a war it's only needed the web.xml and the pom (both already included), the interesting part of the pom is:

```
<plugin>
	<groupId>org.codehaus.mojo</groupId>
	<artifactId>exec-maven-plugin</artifactId>

	<configuration>
		<environmentVariables>
			<PUBLIC_URL>http://localhost:8080/${project.artifactId}</PUBLIC_URL>
			<REACT_APP_ROUTER_BASE>/${project.artifactId}</REACT_APP_ROUTER_BASE>
		</environmentVariables>
	</configuration>
</plugin>
```
                 
Finally use the 

### `mvn clean install`

The generated war can be deployed on the web app, the tomcat will deploy it automatically:

``
[main] org.apache.catalina.startup.Catalina.start Server startup in [1,077] milliseconds
[Catalina-utility-2] 
	org.apache.catalina.startup.HostConfig.deploy 
	WAR Deploying web application archive [<TOMCAT_PATH>\webapps\spa.war]
[Catalina-utility-2] 
	org.apache.catalina.startup.HostConfig.deploy
	WAR Deployment of web application archive [<TOMCAT_PATH>\webapps\spa.war] has finished in [438] ms
``

I hope this help you.

-ANK

### References

https://www.megadix.it/blog/create-react-app-servlet/
