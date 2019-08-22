import { Page, OnLoad, LoadOption } from 'wets';
import { graphql, gql } from '../dist';

@graphql(gql`
`)
export class HomePage extends Page implements OnLoad {
  onLoad(options: LoadOption) {

  }
}
