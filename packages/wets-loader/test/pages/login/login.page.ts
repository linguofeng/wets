import { Page } from 'wets';
import { graphql } from 'wets-graphql';
import gql from 'graphql-tag';

type Props = {
  dispatch: Function;
};

@graphql(gql`
  mutation pay($openId: String) {
    pay(openId: $openId) {
      id
      order
    }
  }
`)
export class LoginPage extends Page<Props, any> {
}
