# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0] - 2026-09-18
### Changed
- adopted the new engage theme: the search suggestions panel now sources its background and text colors from the theme (`theme.palette.background.default`, `theme.palette.text.primary`), fixing the missing panel background and the dark-on-dark text in dark mode
- migrated styling from glamor to `@shopgate/engage/styles` (`makeStyles`/`useStyles`)
- `@shopgate/engage` is now a `>=7.32.0-beta.19` peer & dev dependency (drops PWA 6 support)

## [1.5.0] - 2025-02-19
### Added
- Improved accessibility for Android TalkBack and iOS VoiceOver. It is possible to navigate the search suggestions via screen reader.

## 1.4.0 - 2025-01-03
### Fixed

- Fixed filter button logic. Filters are applied correctly to search results again.

## [1.3.0] - 2024-12-13
### Fixed
- Fixed an result display issue when extension was combined with `@shopgate-project/persistent-search-bar` and `@shopgate-project/configurable-banner`

## [1.2.5] - 2023-01-10
### Added
- Added filters to support filtered search preview
- Added changelog
