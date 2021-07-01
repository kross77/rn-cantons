export default class StringUtils {
  static parseObjectString(s: string): string {
    return s.replace(/\s/g, '').replace(/\n/g, '')
  }
}
